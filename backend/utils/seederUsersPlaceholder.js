const pool = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUND = 12;

const usersPlaceholder = [
  { name: 'Marco', surname: 'Rossi', email: 'marco.rossi@example.com', username: 'marcorossi', password: 'Marco1', role: 'admin' },
  { name: 'Laura', surname: 'Bianchi', email: 'laura.bianchi@example.com', username: 'laurabianchi', password: 'Laura1', role: 'admin' },
  { name: 'Davide', surname: 'Ferrari', email: 'davide.ferrari@example.com', username: 'davideferrari', password: 'Davide1', role: 'admin' },

  { name: 'Giulia', surname: 'Romano', email: 'giulia.romano@example.com', username: 'giuliaromano', password: 'Giulia1', role: 'organizer' },
  { name: 'Alessandro', surname: 'Gallo', email: 'alessandro.gallo@example.com', username: 'alessandrogallo', password: 'Alessandro1', role: 'organizer' },
  { name: 'Sara', surname: 'Conti', email: 'sara.conti@example.com', username: 'saraconti', password: 'Sara1', role: 'organizer' },
  { name: 'Matteo', surname: 'Greco', email: 'matteo.greco@example.com', username: 'matteogreco', password: 'Matteo1', role: 'organizer' },
  { name: 'Francesca', surname: 'Marini', email: 'francesca.marini@example.com', username: 'francescamarini', password: 'Francesca1', role: 'organizer' },

  { name: 'Luca', surname: 'Esposito', email: 'luca.esposito@example.com', username: 'lucaesposito', password: 'Luca1', role: 'partecipant' },
  { name: 'Elena', surname: 'Ricci', email: 'elena.ricci@example.com', username: 'elenaricci', password: 'Elena1', role: 'partecipant' },
  { name: 'Andrea', surname: 'Moretti', email: 'andrea.moretti@example.com', username: 'andreamoretti', password: 'Andrea1', role: 'partecipant' },
  { name: 'Martina', surname: 'Lombardi', email: 'martina.lombardi@example.com', username: 'martinalombardi', password: 'Martina1', role: 'partecipant' },
  { name: 'Simone', surname: 'Barbieri', email: 'simone.barbieri@example.com', username: 'simonebarbieri', password: 'Simone1', role: 'partecipant' },
  { name: 'Chiara', surname: 'Fontana', email: 'chiara.fontana@example.com', username: 'chiarafontana', password: 'Chiara1', role: 'partecipant' },
  { name: 'Federico', surname: 'Santoro', email: 'federico.santoro@example.com', username: 'federicosantoro', password: 'Federico1', role: 'partecipant' },
  { name: 'Valentina', surname: 'Caruso', email: 'valentina.caruso@example.com', username: 'valentinacaruso', password: 'Valentina1', role: 'partecipant' },
  { name: 'Nicola', surname: 'Rinaldi', email: 'nicola.rinaldi@example.com', username: 'nicolarinaldi', password: 'Nicola1', role: 'partecipant' },
  { name: 'Ilaria', surname: 'Martini', email: 'ilaria.martini@example.com', username: 'ilariamartini', password: 'Ilaria1', role: 'partecipant' },
];

const seedUsersPlaceholder = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Seeder utenti placeholder saltato: NODE_ENV non è "development".');
    return;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    await client.query('ALTER SEQUENCE users_id_seq MINVALUE 1 RESTART WITH 1');

    for (const user of usersPlaceholder) {
      const password_hash = await bcrypt.hash(user.password, SALT_ROUND);

      await client.query(
        `INSERT INTO users (name, surname, email, username, password_hash, role)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [user.name, user.surname, user.email, user.username, password_hash, user.role]
      );
    }

    await client.query('COMMIT');
    console.log(`Seeder utenti placeholder completato: creati ${usersPlaceholder.length} utenti.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Errore nel seeder utenti placeholder:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = seedUsersPlaceholder;
