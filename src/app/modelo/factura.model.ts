export interface factura{
    correo:string
    fecha:Date
    funcion:{
        idFuncion:string
        multiplex:string
        sala:number
    }
}