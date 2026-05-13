require('dotenv').config();

const errorHandler = (err, req, res, next) => {

  const status = err.statusCode || (err.name === 'MulterError' ? 400 : 500);

  const messaggio = err.code === 'LIMIT_FILE_SIZE'
    ? 'Il file non puo superare 5 MB'
    : err.message || 'Errore interno del server';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${new Date().toISOString()}] ${status} - ${messaggio}`);
    if (status === 500) console.error(err.stack);
  }

  res.status(status).json({ successo: false, errore: messaggio });
};

module.exports = errorHandler;
