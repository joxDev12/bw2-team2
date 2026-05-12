INSERT INTO
    events (
        organizer_id,
        title,
        description,
        date,
        location,
        max_seats,
        available,
        category
    )
VALUES
    -- ORGANIZER ID 3 - Eventi musicali
    (
        3,
        'Rock Night Live',
        'Concerto rock dal vivo con band emergenti e artisti locali.',
        '2026-06-15',
        'Roma',
        120,
        TRUE,
        'Musica'
    ),
    (
        3,
        'Jazz sotto le Stelle',
        'Serata jazz all’aperto con musicisti professionisti.',
        '2026-06-22',
        'Milano',
        80,
        TRUE,
        'Musica'
    ),
    (
        3,
        'Festival Acustico',
        'Evento musicale dedicato a performance acustiche e cantautorato.',
        '2026-07-05',
        'Firenze',
        25,
        TRUE,
        'Musica'
    ),
    (
        3,
        'Electronic Sound Experience',
        'Serata dedicata alla musica elettronica con DJ set.',
        '2026-07-18',
        'Napoli',
        200,
        TRUE,
        'Musica'
    ),
    (
        3,
        'Concerto Privato Piano & Voice',
        'Evento musicale intimo con posti molto limitati.',
        '2026-08-02',
        'Ancona',
        3,
        TRUE,
        'Musica'
    ),

-- ORGANIZER ID 4 - Eventi sportivi
(
    4,
    'Torneo di Calcetto',
    'Torneo amatoriale di calcetto aperto a squadre locali.',
    '2026-06-18',
    'Roma',
    50,
    TRUE,
    'Sport'
),
(
    4,
    'Corsa Urbana 10K',
    'Gara podistica cittadina su percorso urbano di 10 chilometri.',
    '2026-06-29',
    'Milano',
    300,
    TRUE,
    'Sport'
),
(
    4,
    'Workshop di Arrampicata',
    'Lezione introduttiva all’arrampicata sportiva con istruttori qualificati.',
    '2026-07-10',
    'Firenze',
    15,
    TRUE,
    'Sport'
),
(
    4,
    'Lezione di Yoga al Parco',
    'Sessione di yoga guidata all’aperto per principianti e intermedi.',
    '2026-07-21',
    'Napoli',
    20,
    TRUE,
    'Sport'
),
(
    4,
    'Finale Torneo Tennis',
    'Evento sportivo con accesso ristretto per la finale del torneo.',
    '2026-08-06',
    'Ancona',
    2,
    TRUE,
    'Sport'
),

-- ORGANIZER ID 5 - Conferenze tecnologia
(
    5,
    'AI Developer Conference',
    'Conferenza dedicata a intelligenza artificiale, sviluppo software e nuovi strumenti digitali.',
    '2026-06-20',
    'Milano',
    150,
    TRUE,
    'Tecnologia'
),
(
    5,
    'Cybersecurity Day',
    'Giornata formativa sulla sicurezza informatica e protezione dei dati.',
    '2026-07-02',
    'Roma',
    100,
    TRUE,
    'Tecnologia'
),
(
    5,
    'Web Development Summit',
    'Evento per sviluppatori frontend, backend e full stack.',
    '2026-07-14',
    'Firenze',
    75,
    TRUE,
    'Tecnologia'
),
(
    5,
    'Startup Tech Pitch',
    'Presentazione di startup tecnologiche davanti a mentor e investitori.',
    '2026-07-28',
    'Napoli',
    30,
    TRUE,
    'Tecnologia'
),
(
    5,
    'Workshop Git e Database',
    'Laboratorio pratico con posti limitati su Git, PostgreSQL e progettazione database.',
    '2026-08-09',
    'Ancona',
    4,
    TRUE,
    'Tecnologia'
),

-- ORGANIZER ID 6 - Cultura e spettacolo
(
    6,
    'Serata Teatro Classico',
    'Spettacolo teatrale ispirato ai grandi classici della tradizione italiana.',
    '2026-06-25',
    'Roma',
    90,
    TRUE,
    'Cultura e Spettacolo'
),
(
    6,
    'Mostra d’Arte Moderna',
    'Esposizione di opere contemporanee con visita guidata.',
    '2026-07-04',
    'Milano',
    60,
    TRUE,
    'Cultura e Spettacolo'
),
(
    6,
    'Cinema sotto le Stelle',
    'Proiezione serale all’aperto di film italiani e internazionali.',
    '2026-07-16',
    'Firenze',
    110,
    TRUE,
    'Cultura e Spettacolo'
),
(
    6,
    'Reading Letterario',
    'Incontro culturale con letture, autori e discussione aperta.',
    '2026-07-31',
    'Napoli',
    18,
    TRUE,
    'Cultura e Spettacolo'
),
(
    6,
    'Spettacolo Privato di Cabaret',
    'Serata di cabaret con accesso molto limitato.',
    '2026-08-12',
    'Ancona',
    1,
    TRUE,
    'Cultura e Spettacolo'
),

-- ORGANIZER ID 7 - Enogastronomia
(
    7,
    'Degustazione Vini Italiani',
    'Percorso di degustazione con vini selezionati da diverse regioni italiane.',
    '2026-06-27',
    'Firenze',
    40,
    TRUE,
    'Enogastronomia'
),
(
    7,
    'Street Food Festival',
    'Evento dedicato al cibo di strada con stand locali e prodotti artigianali.',
    '2026-07-08',
    'Napoli',
    250,
    TRUE,
    'Enogastronomia'
),
(
    7,
    'Cena Gourmet Regionale',
    'Cena a tema con piatti tipici regionali e abbinamenti consigliati.',
    '2026-07-19',
    'Roma',
    35,
    TRUE,
    'Enogastronomia'
),
(
    7,
    'Corso di Pasta Fresca',
    'Laboratorio pratico per imparare a preparare pasta fresca fatta a mano.',
    '2026-08-01',
    'Milano',
    10,
    TRUE,
    'Enogastronomia'
),
(
    7,
    'Tavolo Degustazione Riservato',
    'Degustazione privata con posti estremamente limitati.',
    '2026-08-15',
    'Ancona',
    2,
    TRUE,
    'Enogastronomia'
);