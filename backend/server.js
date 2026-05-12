
const express      = require('express');
const errorHandler = require('./middlewares/errorHandler')
const helmet       = require('helmet');
/* const rateLimit    = require('express-rate-limit'); */

//seeds DA COMMENTARE DEL TRY UNA VOLTA MESSI NEL DB!!
// vanno rimossi perchè i js placeholders xke fanno il trucate della tabella, senno la relazione organizer_id ed eventi non combacia
const seedAdmin = require('./middlewares/seeder');
const seedUsersPlaceholder = require('./utils/seederUsersPlaceholder');
const seedEventsPlaceholder = require('./utils/seederEventsPlaceholder');
const seedRegistrationsPlaceholder = require('./utils/seederRegistrationsPlaceholder');


const cors = require('cors');

require('dotenv').config();

//model per creare le tabelle 
const usersModel   = require('./models/usersModel');
const eventsModel    = require('./models/eventsModel');
const registrationsModel = require('./models/registrationsModel');

//routes
const usersRoutes   = require('./routes/usersRoutes');
const eventsRoutes    = require('./routes/eventsRoutes');
const registrationsRoutes = require('./routes/registrationsRoutes');


const app  = express();
const port = process.env.SERVER_PORT;


/* const limiterGlobale = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { successo: false, errore: 'Troppe richieste, riprova tra qualche minuto' }
}); */

app.use(express.json());

app.use(helmet());


app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


/* app.use(limiterGlobale); */

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Backend avviato: OK', status: '200' });
});

// APIs
app.use('/api/users',   usersRoutes);
app.use('/api/events',    eventsRoutes);
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

    await seedUsersPlaceholder();
    // seedAdmin va dopo perchè il usersPlaceholder fa il truncate della tabella facendo ripartire sempre da ID 1
    await seedAdmin(); 

    await seedEventsPlaceholder();
    await seedRegistrationsPlaceholder()

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