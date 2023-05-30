import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SalasService } from './salas.service';

@Injectable({
  providedIn: 'root',
})
export class FuncionService {
  constructor(
    private db: AngularFirestore,
    private salaService: SalasService
  ) {}
}
