import express from 'express';
import routerUsuario from './routes/usuario.js';
import routerPublicacion from './routes/publicacion.js';
import routerComentario from './routes/comentario.js';

const app = express();

const PORT = 3000;

app.use(express.json()); // Especificamos que recibira datos JSON a traves del request

app.use('/api', routerUsuario);
app.use('/api', routerPublicacion);
app.use('/api', routerComentario);

app.listen(PORT, () => {
    console.log(`Escuchando al servidor en localhost:${PORT}`)
})