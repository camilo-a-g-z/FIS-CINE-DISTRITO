export interface Factura{
    correo:string
    fecha:Date
    funcion:{
        idFuncion:string
        multiplex:string
        sala:number
    }
    sillas:Array<string>
    total:number
}