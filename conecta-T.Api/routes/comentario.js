import { Router } from 'express';
import { prisma } from '../database.js';

const router = Router();

// Metodo GET --> /comentarios/1 (Obtener lista de comentarios de una publicacion)
router.get('/comentarios/:id', async (req, res) => {
    const publicacionId = parseInt(req.params.id);

    try {
        const publicacion = await prisma.publicacion.findUnique({
            where: { id: publicacionId }
        });
        if (!publicacion || publicacion.fechaBaja != null) {
            return res.status(404).json({"error": "No existe una publicacion con ese Id"});
        }

        const comentarios = await prisma.publicacion.findUnique({
            where: { id: publicacionId },
            select: {
                comentarios: {
                    where: { fechaBaja: null }
                }
            }
        });
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo POST --> /comentarios (Subir nuevo comentario a publicacion)
router.post('/comentarios', async (req, res) => {
    const { texto, autorId, publicacionId } = req.body;

    if (typeof autorId != 'number' || typeof publicacionId != 'number') {
        return res.status(400).json({"error": "Los Ids deben ser números"});
    }

    try {
        const publicacion = await prisma.publicacion.findUnique({
            where: { id: publicacionId }
        });

        if (!publicacion || publicacion.fechaBaja != null) {
            return res.status(404).json({"error": "No se encontró una publicación con ese Id"});
        }

        const autor = await prisma.usuario.findUnique({
            where: { id: autorId }
        });

        if (!autor || autor.fechaBaja != null) {
            return res.status(404).json({"error": "No se encontró un usuario con ese Id"});
        }

        const comentario = await prisma.comentario.create({
            data: {
                texto,
                autorId,
                publicacionId
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

        res.status(201).json(comentario);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo PUT --> /comentarios (Modificar un comentario de un usuario)
router.put('/comentarios/:id', async (req, res) => {
    const { texto } = req.body;
    const id = parseInt(req.params.id);

    try {
        const comentario = await prisma.comentario.findUnique({
            where: { id }
        });

        if (!comentario || comentario.fechaBaja != null) {
            return res.status(404).json({"error": "No se encontró un comentario con ese Id"});
        }

        await prisma.comentario.update({
            where: { id },
            data: {
                texto
            }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo DELETE --> /comentarios (Borrar un comentario de un usuario)
router.delete('/comentarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const comentario = await prisma.comentario.findUnique({
            where: { id }
        });

        if (!comentario || comentario.fechaBaja != null) {
            return res.status(404).json({"error": "No existe un comentario con ese Id"});
        }

        await prisma.comentario.update({
            where: { id },
            data: { fechaBaja: new Date() }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

export default router;