import { Funcion } from './funcion.model';
import { Sala } from './sala.model';

export interface Compra {
  nomPeli: string;
  sillas: Array<string>;
  total: number;
  multiplex: string;
  hora: string;
  sala: Sala;
  funcion: Funcion;
}
