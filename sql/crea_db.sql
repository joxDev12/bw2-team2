/
/
eseguire questo dentro db postgres

CREATE DATABASE EventHub

/
/
dopo aver creato il db allora tasto destro sul db eventhub crea nuovo script ed inserire uno alla volta questi scripts

CREATE TABLE users (
    id integer NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(25) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    created_at date DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE events (
    id serial primary key,
    organizer_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(500) NOT NULL,
    max_seats INT NOT NULL DEFAULT 0,
    category VARCHAR(255) NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE registrations (
    id serial primary key,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    registered_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
);