import { Router } from 'express';
import { prisma } from '../database.js';
import multer from 'multer';
import path from 'node:path';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/publicaciones');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const filter = (req, file, cb) => {
    const allowedFiles = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedFiles.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Tipo de archivo no aceptado. Debe ser .JPEG .JPG .PNG'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filter
})

// Metodo POST --> /publicaciones (Subir nueva publicacion)
router.post('/publicaciones', upload.single('foto'), async (req, res) => {

    const { texto, autorId } = req.body;

    const autor = Number(autorId);

    const foto = req.file ? req.file.path : null;

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: autor }
        });

        if (!usuario || usuario.fechaBaja != null) {
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
                autorId: autor
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

        if (!usuario || usuario.fechaBaja != null) {
            return res.status(404).json({"error": "No se encontró un usuario con ese Id"});
        }
        
        const usuarioFeed = await prisma.usuario.findUnique({
            where: { id: usuarioId },
            select: {
                siguiendo: { 
                    select: { 
                        publicaciones: {
                            where: { fechaBaja: null }
                        }
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

        if (!usuario || usuario.fechaBaja != null) {
            return res.status(404).json({"error": "No se encontró un usuario con ese Id"});
        }

        const publicaciones = await prisma.publicacion.findMany({
            where: { autorId, fechaBaja: null },
            orderBy: { fechaCreacion: "desc" }
        });
        res.status(200).json(publicaciones);
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

        if (!publicacion || publicacion.fechaBaja != null) {
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

    const now = new Date();

    try {
        const publicacion = await prisma.publicacion.findUnique({
            where: { id }
        });

        if (!publicacion || publicacion.fechaBaja != null) {
            return res.status(404).json({"error": "No existe una publicación con ese Id"});
        }

        await prisma.publicacion.update({
            where: { id: id },
            data: { 
                fechaBaja: now,
                comentarios: {
                    updateMany: {
                        where: { publicacionId: id }, data: { fechaBaja: now }
                    }
                }
            }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

export default router;