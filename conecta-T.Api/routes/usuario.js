import { Router } from 'express'
import { prisma } from '../database.js'

const router = Router();

router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.status(200).json(usuarios);
    } catch(error) {
        res.status(500).json({"message": error});
    }
})

router.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await prisma.usuario.findUnique({
            where: { id:  Number(id) }
        });

        if (!usuario) {
            return res.status(404).json({"error":"No existe un usuario con ese Id"});
        }
        res.status(200).json(usuario);

    } catch(error) {
        res.status(500).json({"message": error});
    }
})

router.post('/usuarios', async (req, res) => {
    try {
        const { nombreUsuario, contrasena, foto, fechaNac } = req.body;
        if (foto != null) {
            const usuario = await prisma.usuario.create({
                data: {
                    nombreUsuario,
                    contrasena,
                    foto,
                    fechaNac
                }
            });
            res.status(201).json(usuario);
        }
    } catch (error) {
        res.status(500).json({"message": error})
    }
})

router.put('/usuarios/:id', async (req, res) => {
    try {
        const { contrasena, nombre, apellido } = req.body;
        const { id } = req.params;
        if (nombre != null && apellido != null) {
            await prisma.usuario.update({
                where: { id: Number(id) },
                data: {
                    contrasena,
                    foto
                }
            });
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({"message": error})
    }
})

router.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.usuario.delete({
            where: { id: Number(id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({"message": error})
    }
})

export default router;