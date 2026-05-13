CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255),
    indirizzo VARCHAR(255),
    img_profile VARCHAR(500),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'partecipant' CHECK (
        role IN (
            'admin',
            'partecipant',
            'organizer'
        )
    ),
    token_version INTEGER NOT NULL DEFAULT 0,
    created_at date DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS location VARCHAR(255),
    ADD COLUMN IF NOT EXISTS indirizzo VARCHAR(255);
