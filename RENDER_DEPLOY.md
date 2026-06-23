# Deploy EventHub su Render

Questa guida serve per deployare tutta la repo `bw2-team2` su Render mantenendo il funzionamento locale.

La repo contiene due app separate:

```text
backend/  -> Node.js + Express + PostgreSQL
front/    -> React + Vite
```

Su Render devi creare tre risorse:

```text
1. PostgreSQL Database
2. Web Service per backend/
3. Static Site per front/
```

## 1. Database PostgreSQL

Crea un database PostgreSQL su Render.

Valori consigliati:

```text
Name: eventhub-db
Database: eventhub
Region: stessa regione del backend
```

Dopo la creazione, copia la connection string interna del database.

## 2. Backend Render Web Service

Crea un nuovo Web Service collegato a questa repo.

Impostazioni:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Variabili ambiente backend:

```text
NODE_ENV=production
DATABASE_URL=<connection string interna del database Render>
DB_SSL=false
FRONTEND_ORIGIN=<url frontend Render, dopo averlo creato>
JWT_SECRET=<valore lungo e casuale>
```

Il backend ora usa automaticamente:

```text
process.env.PORT
```

quando gira su Render, ma continua a usare `SERVER_PORT` o `3000` in locale.

Test backend:

```text
https://nome-backend.onrender.com/health
```

## 3. Frontend Render Static Site

Crea un nuovo Static Site collegato alla stessa repo.

Impostazioni:

```text
Root Directory: front
Build Command: npm install && npm run build-css && npm run build
Publish Directory: dist
```

Variabile ambiente frontend:

```text
VITE_API_URL=https://nome-backend.onrender.com/api
```

## 4. Rewrite React Router

Nel servizio Static Site aggiungi una rewrite:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

Serve per far funzionare rotte come:

```text
/login
/register
/eventi
/eventi/:id
/dashboard
```

## 5. Aggiorna CORS backend

Dopo aver creato il frontend, torna nel backend e aggiorna:

```text
FRONTEND_ORIGIN=https://nome-frontend.onrender.com
```

Puoi inserire piu origin separati da virgola.

## 6. Locale

Il progetto continua a funzionare in locale come prima.

Backend:

```bash
cd backend
npm install
npm start
```

Frontend:

```bash
cd front
npm install
npm run build-css
npm run dev
```

In locale il backend accetta automaticamente richieste da:

```text
http://localhost:5173
http://127.0.0.1:5173
```

## Nota sugli upload

Il backend salva immagini in `backend/uploads` tramite Multer.

Su Render, senza persistent disk, i file caricati possono non essere permanenti dopo restart o redeploy. Per una demo va bene. Per produzione vera serve configurare un Persistent Disk Render o usare un servizio esterno come Cloudinary.
