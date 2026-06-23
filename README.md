# EventHub

EventHub è una piattaforma full stack per scoprire, creare e gestire eventi.

Il progetto nasce come build week di gruppo e comprende un frontend React con area pubblica, autenticazione e dashboard dinamica, più un backend Node.js/Express collegato a PostgreSQL. L'applicazione gestisce utenti, organizzatori, eventi e registrazioni, con permessi diversi in base al ruolo dell'utente.

## Descrizione

EventHub permette agli utenti di esplorare eventi, filtrarli per categoria, data, luogo o testo libero, visualizzare il dettaglio di un evento e registrarsi come partecipanti.

Gli organizzatori possono accedere a una dashboard dedicata per gestire i propri eventi, mentre gli utenti partecipanti possono consultare le proprie iscrizioni. Il backend espone API REST protette con JWT, validazione degli input, gestione dei ruoli e upload immagini per profili ed eventi.

Il progetto è strutturato in due parti principali:

- **front/**: applicazione React sviluppata con Vite, React Router, Bootstrap e Sass;
- **backend/**: API REST Node.js/Express con PostgreSQL, JWT, bcrypt, middleware di sicurezza e upload file.

## Funzionalità principali

### Area pubblica

- Homepage con hero, statistiche, eventi in evidenza, località, sezioni informative e newsletter
- Pagina eventi con filtri per categoria, data, location e ricerca testuale
- Pagina dettaglio evento
- Pagine pubbliche: Chi siamo, Contatti, Login e Registrazione
- SEO dinamico tramite hook dedicato

### Autenticazione e ruoli

- Registrazione utente
- Login con JWT
- Persistenza sessione tramite localStorage
- Logout e gestione automatica del token scaduto/non valido
- Ruoli gestiti: `admin`, `organizer`, `partecipant`
- Dashboard protetta da rotta privata

### Dashboard

- Dashboard dinamica in base al ruolo dell'utente
- Profilo personale modificabile
- Gestione eventi per organizzatori
- Visualizzazione eventi registrati per partecipanti
- Gestione registrazioni per admin/organizzatori dove previsto

### Eventi

- Creazione evento da parte di admin o organizer
- Modifica ed eliminazione eventi con controllo proprietario
- Filtro eventi per categoria
- Ricerca eventi per organizzatore
- Upload immagine evento
- Gestione posti disponibili e stato di disponibilità

### Registrazioni

- Iscrizione agli eventi da parte dei partecipanti
- Numero posti acquistati/riservati
- Aggiornamento automatico dei posti disponibili
- Cancellazione registrazione con recupero dei posti
- Lista pubblica partecipanti per evento
- Controllo permessi su registrazioni personali o eventi propri

### Sicurezza backend

- Password hashate con bcrypt
- Autenticazione JWT
- Token versioning per invalidare sessioni vecchie dopo cambi di ruolo/password
- Helmet per hardening HTTP
- CORS configurabile da variabile ambiente
- Rate limit sulle rotte di login/registrazione
- Validazione input con express-validator
- Upload immagini con multer, filtro MIME/estensione e limite dimensione

## Tech stack

### Frontend

- React
- Vite
- React Router DOM
- Bootstrap 5
- Bootstrap Icons
- Sass / SCSS

### Backend

- Node.js
- Express
- PostgreSQL
- pg
- JWT
- bcrypt
- multer
- helmet
- cors
- express-validator
- express-rate-limit
- dotenv

## Struttura del progetto

```text
bw2-team2/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── postman/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── front/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── scss/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── index.html
│
└── README/
    ├── README.md
    └── scaletta_progetto_EventHub.txt
```

## Database

Il database previsto è PostgreSQL.

Nome database usato in sviluppo:

```text
eventhub
```

Le tabelle principali sono:

- `users`
- `events`
- `registrations`

### Users

La tabella utenti gestisce dati anagrafici, credenziali, immagine profilo, ruolo e token versioning.

Ruoli disponibili:

- `admin`
- `organizer`
- `partecipant`

### Events

La tabella eventi gestisce titolo, descrizione, data, luogo, indirizzo, prezzo, categoria, immagine, organizzatore e posti disponibili.

Ogni evento appartiene a un organizzatore tramite `organizer_id`.

### Registrations

La tabella registrazioni collega utenti partecipanti ed eventi.

Ogni registrazione contiene:

- `user_id`
- `event_id`
- `seats`
- `registered_at`

## Installazione e avvio

### 1. Clona la repository

```bash
git clone https://github.com/joxDev12/bw2-team2.git
cd bw2-team2
```

## Backend

### 2. Installa le dipendenze backend

```bash
cd backend
npm install
```

### 3. Configura le variabili ambiente backend

Copia il file di esempio:

```bash
cp .env.example .env
```

Configura i valori principali:

```env
SERVER_PORT=3000
FRONTEND_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=eventhub
DB_USER=postgres
DB_PASS=postgres

JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 4. Avvia il backend

```bash
npm start
```

Il backend sarà disponibile su:

```text
http://localhost:3000
```

Health check:

```text
GET /health
```

## Frontend

### 5. Installa le dipendenze frontend

Apri un secondo terminale dalla root del progetto:

```bash
cd front
npm install
```

### 6. Configura le variabili ambiente frontend

```bash
cp .env.example .env
```

Valore previsto:

```env
VITE_API_URL=http://localhost:3000/api
```

### 7. Compila il CSS da Sass

```bash
npm run build-css
```

Durante lo sviluppo puoi tenere Sass in watch:

```bash
npm run watch-css
```

### 8. Avvia il frontend

```bash
npm run dev
```

Il frontend sarà disponibile normalmente su:

```text
http://localhost:5173
```

## Script disponibili

### Backend

| Script | Descrizione |
| --- | --- |
| `npm start` | Avvia il server Express |

### Frontend

| Script | Descrizione |
| --- | --- |
| `npm run dev` | Avvia Vite in modalità sviluppo |
| `npm run build` | Crea la build di produzione |
| `npm run preview` | Mostra la build di produzione in locale |
| `npm run lint` | Esegue ESLint |
| `npm run build-css` | Compila Sass in CSS |
| `npm run watch-css` | Ricompila Sass automaticamente a ogni modifica |

## API principali

### Users

```text
POST   /api/users/registra
POST   /api/users/login
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
PATCH  /api/users/:id/img-profile
PATCH  /api/users/:id/promuovi
DELETE /api/users/:id
```

### Events

```text
POST   /api/events
GET    /api/events
GET    /api/events/:id
GET    /api/events/category/:category
GET    /api/events/organizer/:id
PATCH  /api/events/:id
PATCH  /api/events/:id/image
DELETE /api/events/:id
```

### Registrations

```text
POST   /api/registrations
GET    /api/registrations
GET    /api/registrations/:id
GET    /api/registrations/event/:id
GET    /api/registrations/event/:id/public
GET    /api/registrations/user/:id
DELETE /api/registrations/:id
```

## Descrizione per portfolio

**EventHub** è una web app full stack per la gestione e la prenotazione di eventi, sviluppata in team durante una build week. Il progetto include un frontend React con pagine pubbliche, filtri avanzati sugli eventi, autenticazione, dashboard privata e interfacce differenziate in base al ruolo dell'utente.

Il backend è realizzato con Node.js, Express e PostgreSQL, e gestisce utenti, eventi e registrazioni tramite API REST. Sono presenti autenticazione JWT, password hashate con bcrypt, validazione degli input, controllo ruoli, protezione delle rotte e upload immagini per profili ed eventi. L'obiettivo del progetto è simulare una piattaforma reale dove organizzatori e partecipanti interagiscono in modo strutturato.

## Stato del progetto

Progetto full stack in fase avanzata/dimostrativa, con frontend React, backend Express, database PostgreSQL, autenticazione, ruoli, dashboard e gestione eventi.

## Autori

Progetto realizzato come lavoro di gruppo per Build Week 2.

Repository: [joxDev12/bw2-team2](https://github.com/joxDev12/bw2-team2)
