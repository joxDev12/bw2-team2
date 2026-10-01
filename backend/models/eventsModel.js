const pool = require("../config/db");

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    organizer_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    image VARCHAR(500),
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(500) NOT NULL,
    indirizzo VARCHAR(500),
    price NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    is_free BOOLEAN NOT NULL DEFAULT TRUE,
    total_seats INTEGER NOT NULL DEFAULT 1 CHECK(total_seats > 0),
    seats_available INTEGER NOT NULL DEFAULT 1 CHECK(seats_available >= 0),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    category VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (id) ON DELETE CASCADE
);
`;

const init = () => pool.query(CREATE_TABLE);

const findAll = () =>
    pool.query(
        `SELECT
        e.*,
        u.name || ' ' || u.surname AS organizer_fullname,
        u.username AS organizer_username,
        u.img_profile AS organizer_img_profile,
        COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
    FROM events e
    JOIN users u ON u.id = e.organizer_id
    LEFT JOIN registrations reg ON reg.event_id = e.id
    GROUP BY e.id, u.name, u.surname, u.username, u.img_profile
    ORDER BY e.date ASC`,
    );

const findById = (id, client = pool) =>
    client.query(
        `SELECT
        e.*,
        u.name || ' ' || u.surname AS organizer_fullname,
        u.username AS organizer_username,
        u.img_profile AS organizer_img_profile,
        COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
    FROM events e
    JOIN users u ON u.id = e.organizer_id
    LEFT JOIN registrations reg ON reg.event_id = e.id
    WHERE e.id = $1
    GROUP BY e.id, u.name, u.surname, u.username, u.img_profile`,
        [id],
    );

const findByCategory = (category) =>
    pool.query(
        `SELECT
        e.*,
        u.name || ' ' || u.surname AS organizer_fullname,
        u.username AS organizer_username,
        u.img_profile AS organizer_img_profile,
        COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
    FROM events e
    JOIN users u ON u.id = e.organizer_id
    LEFT JOIN registrations reg ON reg.event_id = e.id
    WHERE e.category = $1
    GROUP BY e.id, u.name, u.surname, u.username, u.img_profile`,
        [category],
    );

const findByOrganizerId = (id) =>
    pool.query(
        `SELECT
        e.*,
        u.name || ' ' || u.surname AS organizer_fullname,
        u.username AS organizer_username,
        u.img_profile AS organizer_img_profile,
        COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
    FROM events e
    JOIN users u ON u.id = e.organizer_id
    LEFT JOIN registrations reg ON reg.event_id = e.id
    WHERE e.organizer_id = $1
    GROUP BY e.id, u.name, u.surname, u.username, u.img_profile`,
        [id],
    );

// max_seats dal body → total_seats (fisso) e seats_available (dinamico)
const create = (
    id,
    {
        title,
        image,
        description,
        date,
        location,
        indirizzo,
        price,
        max_seats,
        category,
    },
) =>
    pool.query(
        `INSERT INTO events
        (title, image, description, date, location, indirizzo,
        price, is_free, total_seats, seats_available, "available", category, organizer_id)
        VALUES ($1, $2, $3, $4, $5, $6,
            COALESCE($7, 0), COALESCE($7, 0) = 0,
            $8, $8, $8 > 0,
            $9, $10)
    RETURNING *`,
        [
            title,
            image,
            description,
            date,
            location,
            indirizzo,
            price,
            max_seats,
            category,
            id,
        ],
    );

// max_seats aggiorna sia total_seats che seats_available.
// In PostgreSQL tutte le espressioni SET vedono i valori pre-aggiornamento (snapshot delle colonne):
// (total_seats - seats_available) rappresenta i posti già prenotati,
// seats_available diventa GREATEST(0, nuovo_max_seats - posti_prenotati)
// e total_seats viene aggiornato al nuovo valore ($8).
const update = (
    id,
    dati,
    client = pool,
) => {
    const setClauses = [];
    const values = [];
    let paramIdx = 1;

    const simpleFields = ['title', 'date', 'location', 'category'];
    for (const field of simpleFields) {
        if (Object.prototype.hasOwnProperty.call(dati, field) && dati[field] !== undefined) {
            setClauses.push(`${field} = $${paramIdx}`);
            values.push(dati[field]);
            paramIdx++;
        }
    }

    const nullableFields = ['image', 'description', 'indirizzo'];
    for (const field of nullableFields) {
        if (Object.prototype.hasOwnProperty.call(dati, field) && dati[field] !== undefined) {
            const val = (dati[field] === '' || dati[field] === null) ? null : dati[field];
            setClauses.push(`${field} = $${paramIdx}`);
            values.push(val);
            paramIdx++;
        }
    }

    if (Object.prototype.hasOwnProperty.call(dati, 'price') && dati.price !== undefined) {
        setClauses.push(`price = $${paramIdx}`);
        setClauses.push(`is_free = ($${paramIdx} = 0)`);
        values.push(dati.price);
        paramIdx++;
    }

    if (Object.prototype.hasOwnProperty.call(dati, 'max_seats') && dati.max_seats !== undefined && dati.max_seats !== null) {
        setClauses.push(`seats_available = GREATEST(0, $${paramIdx}::INTEGER - (total_seats - seats_available))`);
        setClauses.push(`total_seats = $${paramIdx}::INTEGER`);
        setClauses.push(`"available" = ($${paramIdx}::INTEGER > (total_seats - seats_available))`);
        values.push(dati.max_seats);
        paramIdx++;
    }

    if (setClauses.length === 0) {
        return findById(id, client);
    }

    values.push(id);
    const query = `
        UPDATE events
        SET ${setClauses.join(', ')}
        WHERE id = $${paramIdx}
        RETURNING *
    `;

    return client.query(query, values);
};

const decrementa = (id, seats = 1, client = pool) =>
    client.query(
        `UPDATE events
        SET seats_available = seats_available - $2,
        "available"     = CASE WHEN seats_available - $2 <= 0 THEN false ELSE true END
        WHERE id = $1 AND seats_available >= $2 AND "available" = true
        RETURNING *`,
        [id, seats],
    );

const incrementa = (id, seats = 1, client = pool) =>
    client.query(
        `UPDATE events
        SET seats_available = LEAST(seats_available + $2, total_seats),
        "available"     = true
        WHERE id = $1
        RETURNING *`,
        [id, seats],
    );

const remove = (id) =>
    pool.query("DELETE FROM events WHERE id = $1 RETURNING id", [id]);

module.exports = {
    init,
    findAll,
    findById,
    findByCategory,
    findByOrganizerId,
    create,
    update,
    remove,
    incrementa,
    decrementa,
};