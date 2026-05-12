const pool = require('../config/db');

const eventiPlaceholder = [
  { organizer_id: 4, title: 'Rock Night Live', description: 'Concerto rock dal vivo con band emergenti e artisti locali.', date: '2026-06-15', location: 'Roma', max_seats: 120, available: true, category: 'Musica' },
  { organizer_id: 4, title: 'Jazz sotto le Stelle', description: 'Serata jazz all’aperto con musicisti professionisti.', date: '2026-06-22', location: 'Milano', max_seats: 80, available: true, category: 'Musica' },
  { organizer_id: 4, title: 'Festival Acustico', description: 'Evento musicale dedicato a performance acustiche e cantautorato.', date: '2026-07-05', location: 'Firenze', max_seats: 25, available: true, category: 'Musica' },
  { organizer_id: 4, title: 'Electronic Sound Experience', description: 'Serata dedicata alla musica elettronica con DJ set.', date: '2026-07-18', location: 'Napoli', max_seats: 200, available: true, category: 'Musica' },
  { organizer_id: 4, title: 'Concerto Privato Piano & Voice', description: 'Evento musicale intimo con posti molto limitati.', date: '2026-08-02', location: 'Ancona', max_seats: 3, available: true, category: 'Musica' },

  { organizer_id: 5, title: 'Torneo di Calcetto', description: 'Torneo amatoriale di calcetto aperto a squadre locali.', date: '2026-06-18', location: 'Roma', max_seats: 50, available: true, category: 'Sport' },
  { organizer_id: 5, title: 'Corsa Urbana 10K', description: 'Gara podistica cittadina su percorso urbano di 10 chilometri.', date: '2026-06-29', location: 'Milano', max_seats: 300, available: true, category: 'Sport' },
  { organizer_id: 5, title: 'Workshop di Arrampicata', description: 'Lezione introduttiva all’arrampicata sportiva con istruttori qualificati.', date: '2026-07-10', location: 'Firenze', max_seats: 15, available: true, category: 'Sport' },
  { organizer_id: 5, title: 'Lezione di Yoga al Parco', description: 'Sessione di yoga guidata all’aperto per principianti e intermedi.', date: '2026-07-21', location: 'Napoli', max_seats: 20, available: true, category: 'Sport' },
  { organizer_id: 5, title: 'Finale Torneo Tennis', description: 'Evento sportivo con accesso ristretto per la finale del torneo.', date: '2026-08-06', location: 'Ancona', max_seats: 2, available: true, category: 'Sport' },

  { organizer_id: 6, title: 'AI Developer Conference', description: 'Conferenza dedicata a intelligenza artificiale, sviluppo software e nuovi strumenti digitali.', date: '2026-06-20', location: 'Milano', max_seats: 150, available: true, category: 'Tecnologia' },
  { organizer_id: 6, title: 'Cybersecurity Day', description: 'Giornata formativa sulla sicurezza informatica e protezione dei dati.', date: '2026-07-02', location: 'Roma', max_seats: 100, available: true, category: 'Tecnologia' },
  { organizer_id: 6, title: 'Web Development Summit', description: 'Evento per sviluppatori frontend, backend e full stack.', date: '2026-07-14', location: 'Firenze', max_seats: 75, available: true, category: 'Tecnologia' },
  { organizer_id: 6, title: 'Startup Tech Pitch', description: 'Presentazione di startup tecnologiche davanti a mentor e investitori.', date: '2026-07-28', location: 'Napoli', max_seats: 30, available: true, category: 'Tecnologia' },
  { organizer_id: 6, title: 'Workshop Git e Database', description: 'Laboratorio pratico con posti limitati su Git, PostgreSQL e progettazione database.', date: '2026-08-09', location: 'Ancona', max_seats: 4, available: true, category: 'Tecnologia' },

  { organizer_id: 7, title: 'Serata Teatro Classico', description: 'Spettacolo teatrale ispirato ai grandi classici della tradizione italiana.', date: '2026-06-25', location: 'Roma', max_seats: 90, available: true, category: 'Cultura e Spettacolo' },
  { organizer_id: 7, title: 'Mostra d’Arte Moderna', description: 'Esposizione di opere contemporanee con visita guidata.', date: '2026-07-04', location: 'Milano', max_seats: 60, available: true, category: 'Cultura e Spettacolo' },
  { organizer_id: 7, title: 'Cinema sotto le Stelle', description: 'Proiezione serale all’aperto di film italiani e internazionali.', date: '2026-07-16', location: 'Firenze', max_seats: 110, available: true, category: 'Cultura e Spettacolo' },
  { organizer_id: 7, title: 'Reading Letterario', description: 'Incontro culturale con letture, autori e discussione aperta.', date: '2026-07-31', location: 'Napoli', max_seats: 18, available: true, category: 'Cultura e Spettacolo' },
  { organizer_id: 7, title: 'Spettacolo Privato di Cabaret', description: 'Serata di cabaret con accesso molto limitato.', date: '2026-08-12', location: 'Ancona', max_seats: 1, available: true, category: 'Cultura e Spettacolo' },

  { organizer_id: 8, title: 'Degustazione Vini Italiani', description: 'Percorso di degustazione con vini selezionati da diverse regioni italiane.', date: '2026-06-27', location: 'Firenze', max_seats: 40, available: true, category: 'Enogastronomia' },
  { organizer_id: 8, title: 'Street Food Festival', description: 'Evento dedicato al cibo di strada con stand locali e prodotti artigianali.', date: '2026-07-08', location: 'Napoli', max_seats: 250, available: true, category: 'Enogastronomia' },
  { organizer_id: 8, title: 'Cena Gourmet Regionale', description: 'Cena a tema con piatti tipici regionali e abbinamenti consigliati.', date: '2026-07-19', location: 'Roma', max_seats: 35, available: true, category: 'Enogastronomia' },
  { organizer_id: 8, title: 'Corso di Pasta Fresca', description: 'Laboratorio pratico per imparare a preparare pasta fresca fatta a mano.', date: '2026-08-01', location: 'Milano', max_seats: 10, available: true, category: 'Enogastronomia' },
  { organizer_id: 8, title: 'Tavolo Degustazione Riservato', description: 'Degustazione privata con posti estremamente limitati.', date: '2026-08-15', location: 'Ancona', max_seats: 2, available: true, category: 'Enogastronomia' },
];

const seedEventsPlaceholder = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Seeder eventi placeholder saltato: NODE_ENV non è "development".');
    return;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('TRUNCATE TABLE events RESTART IDENTITY CASCADE');
    await client.query('ALTER SEQUENCE events_id_seq MINVALUE 1 RESTART WITH 1');

    for (const evento of eventiPlaceholder) {
      await client.query(
        `INSERT INTO events (organizer_id, title, description, date, location, max_seats, available, category)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          evento.organizer_id,
          evento.title,
          evento.description,
          evento.date,
          evento.location,
          evento.max_seats,
          evento.available,
          evento.category,
        ]
      );
    }

    await client.query('COMMIT');
    console.log(`Seeder eventi placeholder completato: creati ${eventiPlaceholder.length} eventi.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Errore nel seeder eventi placeholder:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = seedEventsPlaceholder;
