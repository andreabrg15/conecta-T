import { Router } from 'express'
import { prisma } from '../database.js'

const router = Router();

// Metodo GET --> /usuarios (Autorizar o no inicio de sesion)
router.get('/usuarios', async (req, res) => {
    const nombreUsuario = req.get('nombre-usuario');
    const contra = req.get('contra');
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { 
                nombreUsuario, contrasena: contra,
                fechaBaja: null
            }
        });
        if (!usuario) {
            return res.status(401).json({"error":"Credenciales no válidas"});
        }
        res.status(200).json(usuario.id);
    } catch(error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo GET --> /usuarios/1 (Obtener detalles de un usuario)
router.get('/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id:  id }
        });

        if (!usuario) {
            return res.status(404).json({"error":"No existe un usuario con ese Id"});
        }
        res.status(200).json(usuario);

    } catch(error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo GET --> /usuarios/seguidos/1 (Obtener lista de usuarios seguidos por este usuario)
router.get('/usuarios/seguidos/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const usuarioSigue = await prisma.usuario.findUnique({
            where: { id },
            select: {
                id: true,
                nombreUsuario: true,
                siguiendo: true
            }
        });

        if (!usuarioSigue) {
            return res.status(404).json({"error": "No se encontró un usuario con ese Id"});
        }
        res.status(200).json(usuarioSigue);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo GET --> /usuarios/seguidores/1 (Obtener lista de usuarios que siguen a este usuario)
router.get('/usuarios/seguidores/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const usuarioSiguen = await prisma.usuario.findUnique({
            where: { id },
            select: {
                id: true,
                nombreUsuario: true,
                seguidores: true
            }
        });

        if (!usuarioSiguen) {
            res.status(404).json({"error": "No se encontró un usuario con ese Id"});
        }
        res.status(200).json(usuarioSiguen);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo POST --> /usuarios (Agregar un nuevo usuario)
router.post('/usuarios', async (req, res) => {

    const { nombreUsuario, contrasena, fotoUrl, fechaNac } = req.body;

    try {
        /*
        Ejemplo: Ingresar esto en el body
        {
            "nombreUsuario": "usuario123",
            "contrasena": "1234", 
            "fotoUrl": "https://example.com/fotos/miFoto.jpg",
            "fechaNac": "2004-09-20T00:00:00Z"
        }
        */
        const usuario = await prisma.usuario.create({
            data: {
                nombreUsuario,
                contrasena,
                foto: fotoUrl || null,
                fechaNac
            }
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo PUT --> /usuarios (Modificar datos de un usuario)
router.put('/usuarios/:id', async (req, res) => {
    const { contrasena, fotoUrl } = req.body;
    const id = parseInt(req.params.id);

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuario) {
            return res.status(404).json({"error": "No existe un usuario con ese Id"});
        }
        /*
        Ejemplo: Ingresar esto en el body
        {
            "contrasena": "4321",
            "fotoUrl": "https://example.com/fotos/superFoto.jpg"
        }
        */
        await prisma.usuario.update({
            where: { id: id },
            data: {
                contrasena,
                foto: fotoUrl || null
            }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

// Metodo PUT --> /usuarios/1 (Guardar usuario sigue a otro usuario)
router.put('/usuarios/seguir/:id', async (req, res) => {
    const { seguidoId } = req.body;
    if (typeof seguidoId != 'number') {
        return res.status(400).json({"error": "El Id debe ser un número"});
    }
    const seguidorId = parseInt(req.params.id);

    try {
        const seguidor = await prisma.usuario.findUnique({
            where: { id: seguidorId }
        });
        const seguido = await prisma.usuario.findUnique({
            where: { id: seguidoId }
        });

        if (!seguidor || !seguido) {
            return res.status(404).json({"error": "No existe un usuario con ese Id"});
        }

        await prisma.usuario.update({
            where: { id: seguidorId },
            data: {
                siguiendo: {
                    connect: { id: seguidoId }
                }
            }
        });
        res.status(204).end();
    } catch (error) {
        res.send(500).json({"message": error.message});
    }
})

// Metodo PUT --> /usuarios/1 (Guardar usuario dejo de seguir a otro usuario)
router.put('/usuarios/dejarDeSeguir/:id', async (req, res) => {
    const { seguidoId } = req.body;
    if (typeof seguidoId != 'number') {
        return res.status(400).json({"error": "El Id debe ser un número"});
    }
    const seguidorId = parseInt(req.params.id);

    try {
        const seguidor = await prisma.usuario.findUnique({
            where: { id: seguidorId }
        });
        const seguido = await prisma.usuario.findUnique({
            where: { id: seguidoId }
        });

        if (!seguidor || !seguido) {
            return res.status(404).json({"error": "No existe un usuario con ese Id"});
        }

        await prisma.usuario.update({
            where: { id: seguidorId },
            data: {
                siguiendo: {
                    disconnect: { id: seguidoId }
                }
            }
        });
        res.status(204).end();
    } catch (error) {
        res.send(500).json({"message": error.message});
    }
})

// Metodo DELETE --> /usuarios (Borrar un usuario)
router.delete('/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const now = new Date();

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuario || usuario.fechaBaja != null) {
            return res.status(404).json({"error": "No existe un usuario con ese Id"});
        }

        await prisma.usuario.update({
            where: { id: id }, 
            data: { 
                fechaBaja: now,
                publicaciones: {
                    updateMany: {
                        where: { autorId: id }, data: { fechaBaja: now }
                    }
                },
                comentarios: {
                    updateMany: {
                        where: { autorId: id }, data: { fechaBaja: now }
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