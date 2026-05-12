INSERT INTO
    events (
        organizer_id,
        title,
        image,
        description,
        date,
        location,
        max_seats,
        available,
        category
    )
VALUES
    -- ORGANIZER ID 4 - Eventi musicali
    (
        4,
        'Rock Night Live',
        'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=800&fit=crop',
        'Concerto rock dal vivo con band emergenti e artisti locali.',
        '2026-06-15',
        'Roma',
        120,
        TRUE,
        'Musica'
    ),
    (
        4,
        'Jazz sotto le Stelle',
        'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&h=800&fit=crop',
        'Serata jazz all’aperto con musicisti professionisti.',
        '2026-06-22',
        'Milano',
        80,
        TRUE,
        'Musica'
    ),
    (
        4,
        'Festival Acustico',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=800&fit=crop',
        'Evento musicale dedicato a performance acustiche e cantautorato.',
        '2026-07-05',
        'Firenze',
        25,
        TRUE,
        'Musica'
    ),
    (
        4,
        'Electronic Sound Experience',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop',
        'Serata dedicata alla musica elettronica con DJ set.',
        '2026-07-18',
        'Napoli',
        200,
        TRUE,
        'Musica'
    ),
    (
        4,
        'Concerto Privato Piano & Voice',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop',
        'Evento musicale intimo con posti molto limitati.',
        '2026-08-02',
        'Ancona',
        3,
        TRUE,
        'Musica'
    ),

-- ORGANIZER ID 5 - Eventi sportivi
(
    5,
    'Torneo di Calcetto',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
    'Torneo amatoriale di calcetto aperto a squadre locali.',
    '2026-06-18',
    'Roma',
    50,
    TRUE,
    'Sport'
),
(
    5,
    'Corsa Urbana 10K',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=800&fit=crop',
    'Gara podistica cittadina su percorso urbano di 10 chilometri.',
    '2026-06-29',
    'Milano',
    300,
    TRUE,
    'Sport'
),
(
    5,
    'Workshop di Arrampicata',
    'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&h=800&fit=crop',
    'Lezione introduttiva all’arrampicata sportiva con istruttori qualificati.',
    '2026-07-10',
    'Firenze',
    15,
    TRUE,
    'Sport'
),
(
    5,
    'Lezione di Yoga al Parco',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop',
    'Sessione di yoga guidata all’aperto per principianti e intermedi.',
    '2026-07-21',
    'Napoli',
    20,
    TRUE,
    'Sport'
),
(
    5,
    'Finale Torneo Tennis',
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop',
    'Evento sportivo con accesso ristretto per la finale del torneo.',
    '2026-08-06',
    'Ancona',
    2,
    TRUE,
    'Sport'
),

-- ORGANIZER ID 6 - Conferenze tecnologia
(
    6,
    'AI Developer Conference',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
    'Conferenza dedicata a intelligenza artificiale, sviluppo software e nuovi strumenti digitali.',
    '2026-06-20',
    'Milano',
    150,
    TRUE,
    'Tecnologia'
),
(
    6,
    'Cybersecurity Day',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop',
    'Giornata formativa sulla sicurezza informatica e protezione dei dati.',
    '2026-07-02',
    'Roma',
    100,
    TRUE,
    'Tecnologia'
),
(
    6,
    'Web Development Summit',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
    'Evento per sviluppatori frontend, backend e full stack.',
    '2026-07-14',
    'Firenze',
    75,
    TRUE,
    'Tecnologia'
),
(
    6,
    'Startup Tech Pitch',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    'Presentazione di startup tecnologiche davanti a mentor e investitori.',
    '2026-07-28',
    'Napoli',
    30,
    TRUE,
    'Tecnologia'
),
(
    6,
    'Workshop Git e Database',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=800&fit=crop',
    'Laboratorio pratico con posti limitati su Git, PostgreSQL e progettazione database.',
    '2026-08-09',
    'Ancona',
    4,
    TRUE,
    'Tecnologia'
),

-- ORGANIZER ID 7 - Cultura e spettacolo
(
    7,
    'Serata Teatro Classico',
    'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=800&fit=crop',
    'Spettacolo teatrale ispirato ai grandi classici della tradizione italiana.',
    '2026-06-25',
    'Roma',
    90,
    TRUE,
    'Cultura e Spettacolo'
),
(
    7,
    'Mostra d’Arte Moderna',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=800&fit=crop',
    'Esposizione di opere contemporanee con visita guidata.',
    '2026-07-04',
    'Milano',
    60,
    TRUE,
    'Cultura e Spettacolo'
),
(
    7,
    'Cinema sotto le Stelle',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop',
    'Proiezione serale all’aperto di film italiani e internazionali.',
    '2026-07-16',
    'Firenze',
    110,
    TRUE,
    'Cultura e Spettacolo'
),
(
    7,
    'Reading Letterario',
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1200&h=800&fit=crop',
    'Incontro culturale con letture, autori e discussione aperta.',
    '2026-07-31',
    'Napoli',
    18,
    TRUE,
    'Cultura e Spettacolo'
),
(
    7,
    'Spettacolo Privato di Cabaret',
    'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200&h=800&fit=crop',
    'Serata di cabaret con accesso molto limitato.',
    '2026-08-12',
    'Ancona',
    1,
    TRUE,
    'Cultura e Spettacolo'
),

-- ORGANIZER ID 8 - Enogastronomia
(
    8,
    'Degustazione Vini Italiani',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=800&fit=crop',
    'Percorso di degustazione con vini selezionati da diverse regioni italiane.',
    '2026-06-27',
    'Firenze',
    40,
    TRUE,
    'Enogastronomia'
),
(
    8,
    'Street Food Festival',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop',
    'Evento dedicato al cibo di strada con stand locali e prodotti artigianali.',
    '2026-07-08',
    'Napoli',
    250,
    TRUE,
    'Enogastronomia'
),
(
    8,
    'Cena Gourmet Regionale',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop',
    'Cena a tema con piatti tipici regionali e abbinamenti consigliati.',
    '2026-07-19',
    'Roma',
    35,
    TRUE,
    'Enogastronomia'
),
(
    8,
    'Corso di Pasta Fresca',
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200&h=800&fit=crop',
    'Laboratorio pratico per imparare a preparare pasta fresca fatta a mano.',
    '2026-08-01',
    'Milano',
    10,
    TRUE,
    'Enogastronomia'
),
(
    8,
    'Tavolo Degustazione Riservato',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop',
    'Degustazione privata con posti estremamente limitati.',
    '2026-08-15',
    'Ancona',
    2,
    TRUE,
    'Enogastronomia'
);
