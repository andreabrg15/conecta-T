import { Router } from 'express';
import { prisma } from '../database.js';

const router = Router();

// Metodo GET --> /publicaciones (Obtener lista de publicaciones de quienes sigue un usuario -FEED-)
router.get('/publicaciones', async (req, res) => {

    if (!req.body) {
        return res.status(400).json({"error": "Debe proporcionar el Id del usuario en sesion"});
    }
    const { usuarioId } = req.body;

    if (typeof usuarioId != 'number') {
        return res.status(400).json({"error": "El Id del usuario debe ser un número"});
    }

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: usuarioId }
        });

        if (!usuario) {
            return res.status(404).json({"error": "No se encontró un usuario con ese Id"});
        }
        const usuarioFeed = await prisma.usuario.findUnique({
            where: { id: usuarioId },
            select: {
                siguiendo: { 
                    select: { 
                        publicaciones: true 
                    } 
                }
            }
        });

        res.status(200).json(usuarioFeed);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo GET --> /publicaciones/1 (Obtener lista de publicaciones de un usuario)
router.get('/publicaciones/:autorId', async (req, res) => {
    const autorId = parseInt(req.params.autorId);

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: autorId }
        });

        if (!usuario) {
            return res.status(404).json({"error": "No se encontró un usuario con ese Id"});
        }

        const publicaciones = await prisma.publicacion.findMany({
            where: { autorId },
            orderBy: { fechaCreacion: "desc" }
        });
        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo POST --> /publicaciones (Subir nueva publicacion)
router.post('/publicaciones', async (req, res) => {
    const { texto, foto, autorId } = req.body;

    if (typeof autorId != 'number') {
        return res.status(400).json({"error": "El Id del autor debe ser un número"});
    }

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: usuarioId }
        });

        if (!usuario) {
            return res.status(404).json({"error": "No se pudo encontrar un usuario con ese Id"});
        }
        /*
        Ejemplo: Ingresar esto en el body
        {
            "texto": "hooooolaaa",
            "foto": "https://example.com/fotos/miFoto.jpg",
            "autorId": 1
        }
        */
        const publicacion = await prisma.publicacion.create({
            data: {
                texto,
                foto,
                autorId
            },
            include: {
                autor: {
                    select: {
                        nombreUsuario: true,
                        foto: true
                    }
                }
            }
        });

        res.status(201).json(publicacion);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo PUT --> /publicaciones/1 (Modificar una publicacion de un usuario)
router.put('/publicaciones/:id', async (req, res) => {
    const { texto, foto } = req.body;
    const id = parseInt(req.params.id);

    try {
        const publicacion = await prisma.publicacion.findUnique({
            where: { id }
        });

        if (!publicacion) {
            return res.status(404).json({"error": "No se encontró una publicación con ese Id"});
        }

        await prisma.publicacion.update({
            where: {
                id: id
            },
            data: {
                texto,
                foto
            }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo DELETE --> /publicaciones/1 (Borrar publicacion de un usuario)
router.delete('/publicaciones/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const publicacion = await prisma.publicacion.findUnique({
            where: { id }
        });

        if (!publicacion) {
            return res.status(404).json({"error": "No existe una publicación con ese Id"});
        }

        await prisma.publicacion.delete({
            where: { id: id }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

export default router;