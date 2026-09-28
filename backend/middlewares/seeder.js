const pool = require("../config/db");
const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const SALT_ROUND = 12;

const seedAdmin = async () => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const username = process.env.ADMIN_USERNAME;
    const name = process.env.ADMIN_NAME || "Admin";
    const surname = process.env.ADMIN_SURNAME || "Sistema";

    if (process.env.NODE_ENV !== "development") {
        console.warn('Seeder saltato: NODE_ENV non è "development".');
        console.warn(
            "Per creare l'admin, imposta NODE_ENV=development nel .env",
        );
        return;
    }

    if (!email || !password) {
        console.warn(
            "Seeder admin saltato: ADMIN_EMAIL o ADMIN_PASSWORD mancanti nel .env",
        );
        return;
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        await client.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
        await client.query(
            "ALTER SEQUENCE users_id_seq MINVALUE 1 RESTART WITH 1",
        );

        const hash = await bcrypt.hash(password, SALT_ROUND);
        await client.query(
            `INSERT INTO users (name, surname, email, username, password_hash, role)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [name, surname, email, username, hash, "admin"],
        );
        await client.query("COMMIT");
        console.log(
            `Admin creato! Nome: ${name} ${surname} - Email: ${email} - Username: ${username}`,
        );
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Errore nel seeder admin:", err.message);
    } finally {
        client.release();
    }
};

module.exports = seedAdmin;