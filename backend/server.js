require('dotenv').config();
const express      = require('express');
const errorHandler = require('./middlewares/errorHandler');
const helmet       = require('helmet');
const path         = require('path');
/* const rateLimit    = require('express-rate-limit'); */

// Seeders usati solo in sviluppo locale.
// In produzione non devono partire, altrimenti possono sporcare o resettare dati reali.
const seedAdmin = require('./middlewares/seeder');
const seedUsersPlaceholder = require('./utils/seederUsersPlaceholder');
const seedEventsPlaceholder = require('./utils/seederEventsPlaceholder');
const seedRegistrationsPlaceholder = require('./utils/seederRegistrationsPlaceholder');

const cors = require('cors');

// model per creare le tabelle
const usersModel = require('./models/usersModel');
const eventsModel = require('./models/eventsModel');
const registrationsModel = require('./models/registrationsModel');

// routes
const usersRoutes = require('./routes/usersRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const registrationsRoutes = require('./routes/registrationsRoutes');

const app = express();

// Render espone la porta tramite process.env.PORT.
// In locale continua a funzionare con SERVER_PORT oppure con fallback 3000.
const port = process.env.PORT || process.env.SERVER_PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(process.env.FRONTEND_ORIGIN || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean),
];

/* const limiterGlobale = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { successo: false, errore: 'Troppe richieste, riprova tra qualche minuto' }
}); */

app.use(express.json());

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(cors({
  origin: (origin, callback) => {
    // Permette richieste server-to-server, Postman, curl e health checks senza Origin.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origine non consentita da CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* app.use(limiterGlobale); */

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Backend avviato: OK', status: '200' });
});

// APIs
app.use('/api/users', usersRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/registrations', registrationsRoutes);

app.use((req, res) => {
  res.status(404).json({ successo: false, errore: 'Endpoint non trovato' });
});

app.use(errorHandler);

const start = async () => {
  try {
    await usersModel.init();
    await eventsModel.init();
    await registrationsModel.init();

    if (process.env.NODE_ENV === 'development') {
      await seedUsersPlaceholder();
      await seedAdmin();
      await seedEventsPlaceholder();
      await seedRegistrationsPlaceholder();
    }

    console.log('Tabelle sincronizzate');

    app.listen(port, () =>
      console.log(`Server EventHub in ascolto su http://localhost:${port}`)
    );
  } catch (err) {
    console.error('Errore di avvio al Server EventHub:', err);
    process.exit(1);
  }
};

start();
