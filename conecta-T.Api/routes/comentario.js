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
        if (!publicacion) {
            return res.status(404).json({"error": "No se encontró ninguna publicacion con ese Id"});
        }

        const comentarios = await prisma.publicacion.findUnique({
            where: { id: publicacionId },
            select: {
                comentarios: true
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

export default router;