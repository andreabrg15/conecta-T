import express from 'express';
import routerUsuario from './routes/usuario.js';
import routerPublicacion from './routes/publicacion.js';

const app = express();

const PORT = 3000;

app.use(express.json()); // Especificamos que recibira datos JSON a traves del request

app.use('/api', routerUsuario);
app.use('/api', routerPublicacion);

app.listen(PORT, () => {
    console.log(`Escuchando al servidor en localhost:${PORT}`)
})