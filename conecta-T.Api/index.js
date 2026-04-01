import express from 'express';
import cors from 'cors';
import routerUsuario from './routes/usuario.js';
import routerPublicacion from './routes/publicacion.js';
import routerComentario from './routes/comentario.js';

const app = express();

const PORT = 3000;

app.use(express.json()); // Especificamos que recibira datos JSON a traves del request

const allowedOrigins = [
  'http://localhost:4200' // Origen local
];

app.use(cors({
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('No permitido por CORS'));
      }
  }
}));

app.use('/api', routerUsuario);
app.use('/api', routerPublicacion);
app.use('/api', routerComentario);

app.listen(PORT, () => {
    console.log(`Escuchando al servidor en localhost:${PORT}`)
})