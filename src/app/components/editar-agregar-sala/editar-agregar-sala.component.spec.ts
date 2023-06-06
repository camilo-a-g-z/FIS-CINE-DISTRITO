import{ TestBed} from '@angular/core/testing';
import {EditarAgregarSalaComponent } from './editar-agregar-sala.component';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    AngularFirestoreModule,
    SETTINGS,
    Settings,
  } from '@angular/fire/compat/firestore';
import { SalasService } from 'src/app/servicios/salas.service';
import { environment } from 'src/environments/environment';
describe ('EditarAgregarSalaComponent',()=>{
    beforeEach(async()=>{
     
        await TestBed.configureTestingModule({
            imports:[
                FormsModule,
                AngularFireModule,
                AngularFirestoreModule,
                AngularFireModule.initializeApp(environment.firestore),
                    RouterModule.forRoot([
                    // Definición de rutas
                  ])
            ],
            declarations:[
            EditarAgregarSalaComponent,
        
            ],
            providers:[
                SalasService
            ]
        }).compileComponents();
    })
    it('El atributo auxiliar filas deberia inicializarse con un valor de 0',()=>{
        const fixture = TestBed.createComponent(EditarAgregarSalaComponent);
        const app = fixture.componentInstance;
        expect(app.filas).toEqual(0);
    })
    it('El atributo auxiliar asientoPorFila deberia inicializarse con un valor de 0',()=>{
        const fixture = TestBed.createComponent(EditarAgregarSalaComponent);
        const app = fixture.componentInstance;
        expect(app.asientosPorFila).toEqual(0);
    })
})