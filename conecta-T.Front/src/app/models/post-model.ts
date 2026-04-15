export interface PostModel {
    id: number,
    texto: string,
    foto: string,
    fechaCreacion: Date,
    fechaBaja?: Date,
    autorId: number
}
