export interface UserInfo {
    id: number,
    nombreUsuario: string,
    contrasena: string,
    foto?: string,
    fechaNac: Date,
    fechaCreacion: Date,
    fechaBaja?: Date
}
