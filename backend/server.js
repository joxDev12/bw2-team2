
const express      = require('express');
const errorHandler = require('./middleware/errorHandler');
const helmet       = require('helmet');
const rateLimit    = require('express-rate-limit');
const seedAdmin    = require('./middleware/seeder');
const cors = require('cors');

require('dotenv').config();


const app  = express();
const port = process.env.SERVER_PORT;


const limiterGlobale = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { successo: false, errore: 'Troppe richieste, riprova tra qualche minuto' }
});

app.use(express.json());

app.use(helmet());


app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(limiterGlobale);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend avviato: OK', status: '200' });
});




app.use((req, res) => {
  res.status(404).json({ successo: false, errore: 'Endpoint non trovato' });
});

app.use(errorHandler);


const start = async () => {
  try {
    await utenteModel.init();
    await libriModel.init();
    await prestitiModel.init();

    await seedAdmin();

    console.log('Tabelle sincronizzate');

    app.listen(port, () =>
      console.log(`Server EventHub in ascolto su http://localhost:${port}`)
    );
  } catch (err) {
    console.error('Errore di avvio al Server EventHub:', err);
    process.exit(1); // Usciamo con codice errore se qualcosa va storto
  }
};

start();