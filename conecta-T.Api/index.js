import express from 'express';
import routerUsuario from './routes/usuario.js';

const app = express();

const PORT = 3000;

app.use(express.json()); // Especificamos que recibira datos JSON a traves del request

app.use('/api', routerUsuario);

app.listen(PORT, () => {
    console.log(`Escuchando al servidor en localhost:${PORT}`)
})