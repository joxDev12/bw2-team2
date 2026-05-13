INSERT INTO
    users (
        name,
        surname,
        email,
        username,
        location,
        indirizzo,
        img_profile,
        password_hash,
        role
    )
VALUES
    -- 3 admin
    (
        'Marco',
        'Rossi',
        'marco.rossi@example.com',
        'marcorossi',
        'Roma',
        'Via Appia 12',
        'https://i.pravatar.cc/300?img=1',
        '$2b$12$uA8jb82FSIRWCQAfiDTZL.iX2bwRc6qOgbRvFNYS3iAUlBw.UH/zC',
        'admin'
    ),
    (
        'Laura',
        'Bianchi',
        'laura.bianchi@example.com',
        'laurabianchi',
        'Milano',
        'Corso Garibaldi 45',
        'https://i.pravatar.cc/300?img=2',
        '$2b$12$1UuDvD2hcp730cNjNvDJKu3WM1HR5UyRFeWTAG5RW0lWutqeHlbiG',
        'admin'
    ),
    (
        'Davide',
        'Ferrari',
        'davide.ferrari@example.com',
        'davideferrari',
        'Napoli',
        'Via Toledo 88',
        'https://i.pravatar.cc/300?img=3',
        '$2b$12$BY/2oKbmP8X7OeO1cUYB9OAGfr4TxEIYmKTaDDnRSIupjIlkLb1ju',
        'admin'
    ),

-- 5 organizer
(
    'Giulia',
    'Romano',
    'giulia.romano@example.com',
    'giuliaromano',
    'Ancona',
    'Via del Porto 7',
    'https://i.pravatar.cc/300?img=4',
    '$2b$12$qqtcm6BbhJ.yuUjgyrpkR.uhbjBQmoLjWB7nuyupnzxBycY8EzOzu',
    'organizer'
),
(
    'Alessandro',
    'Gallo',
    'alessandro.gallo@example.com',
    'alessandrogallo',
    'Firenze',
    'Via dei Calzaiuoli 21',
    'https://i.pravatar.cc/300?img=5',
    '$2b$12$Fb3NguH5x9T/ZQaRO0ORIeHgcjn/TdfGg6HN3oaBDdD4KlQIsQ2rO',
    'organizer'
),
(
    'Sara',
    'Conti',
    'sara.conti@example.com',
    'saraconti',
    'Roma',
    'Viale Trastevere 103',
    'https://i.pravatar.cc/300?img=6',
    '$2b$12$.DkpBIJViX6VEFUfrFAxLePrQNWlMpRo2XSVx6P4LF4.nfx1OhxAO',
    'organizer'
),
(
    'Matteo',
    'Greco',
    'matteo.greco@example.com',
    'matteogreco',
    'Milano',
    'Via Torino 19',
    'https://i.pravatar.cc/300?img=7',
    '$2b$12$BxVy8ZeaVOnc8JgLAEgqmOuZBy8.5fHjYDWzgX/g9.tt3Lrv8h/Ty',
    'organizer'
),
(
    'Francesca',
    'Marini',
    'francesca.marini@example.com',
    'francescamarini',
    'Napoli',
    'Piazza Dante 5',
    'https://i.pravatar.cc/300?img=8',
    '$2b$12$5yKchqPypgzdO2C2O0BbiOIlC0oxYUiRUtSIiM.E93l7duePyltGO',
    'organizer'
),

-- 10 partecipant
(
    'Luca',
    'Esposito',
    'luca.esposito@example.com',
    'lucaesposito',
    'Ancona',
    'Corso Mazzini 31',
    'https://i.pravatar.cc/300?img=9',
    '$2b$12$Cv/6bxfqhBmYbMCoW44UQerli69R7T02O.K7hbl22E1c2WepYuCSK',
    'partecipant'
),
(
    'Elena',
    'Ricci',
    'elena.ricci@example.com',
    'elenaricci',
    'Firenze',
    'Via Romana 14',
    'https://i.pravatar.cc/300?img=10',
    '$2b$12$l4PcMrMMXhL3I.4dQDHGPuBdIxwUrMRnN.MTeinkuSPz5RW0v0Agi',
    'partecipant'
),
(
    'Andrea',
    'Moretti',
    'andrea.moretti@example.com',
    'andreamoretti',
    'Roma',
    'Via Nazionale 62',
    'https://i.pravatar.cc/300?img=11',
    '$2b$12$KqUR98FIABUMZkKTiUB5Q.dHi3vKCvSgCcXSvPYmAyPfMyB8WItR2',
    'partecipant'
),
(
    'Martina',
    'Lombardi',
    'martina.lombardi@example.com',
    'martinalombardi',
    'Milano',
    'Viale Monza 140',
    'https://i.pravatar.cc/300?img=12',
    '$2b$12$yv5bS1dCbrcpYphjySVzXODNAn7JiErPUrOXril/14O.gvm6Vfy6a',
    'partecipant'
),
(
    'Simone',
    'Barbieri',
    'simone.barbieri@example.com',
    'simonebarbieri',
    'Napoli',
    'Via Chiaia 26',
    'https://i.pravatar.cc/300?img=13',
    '$2b$12$65VZIn5dfru0Smx.eqvXyuWqV4dQcYitD2yWe2ga4kasgqftxW1va',
    'partecipant'
),
(
    'Chiara',
    'Fontana',
    'chiara.fontana@example.com',
    'chiarafontana',
    'Ancona',
    'Via Conero 9',
    'https://i.pravatar.cc/300?img=14',
    '$2b$12$BHT2ak.Uw6B48IQyttE7NOMrI8oe7qRKRsSH9stLw9vhER8l78mKK',
    'partecipant'
),
(
    'Federico',
    'Santoro',
    'federico.santoro@example.com',
    'federicosantoro',
    'Firenze',
    'Borgo San Frediano 52',
    'https://i.pravatar.cc/300?img=15',
    '$2b$12$ku0qyQwPh3Yv3YTNJOhjy.tRR29t79dDKeGThx9tK2Pt4OesLTTQ2',
    'partecipant'
),
(
    'Valentina',
    'Caruso',
    'valentina.caruso@example.com',
    'valentinacaruso',
    'Roma',
    'Via Ostiense 77',
    'https://i.pravatar.cc/300?img=16',
    '$2b$12$bCsp7U1XpNYXvZBnvgR9YOek9c1u41CPJ0RY3pIK44BTa2NWfikvi',
    'partecipant'
),
(
    'Nicola',
    'Rinaldi',
    'nicola.rinaldi@example.com',
    'nicolarinaldi',
    'Milano',
    'Via Brera 11',
    'https://i.pravatar.cc/300?img=17',
    '$2b$12$dWh.AMHxaD/faVXhQ7UtQ.BhBh82hP4QKEqN1SbC2/wFVr0l0sP1a',
    'partecipant'
),
(
    'Ilaria',
    'Martini',
    'ilaria.martini@example.com',
    'ilariamartini',
    'Napoli',
    'Via Partenope 33',
    'https://i.pravatar.cc/300?img=18',
    '$2b$12$7DbWwu.DoWvCWzbd7PSXYO3mQao/xTCsoDfNOWa.nV4A6aAp/SYXy',
    'partecipant'
);
