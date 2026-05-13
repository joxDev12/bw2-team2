CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    organizer_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    image VARCHAR(500),
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(500) NOT NULL,
    max_seats INTEGER NOT NULL DEFAULT 1 CHECK (max_seats >= 0),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    category VARCHAR(255) NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (id) ON DELETE CASCADE
);
