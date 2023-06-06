import{ TestBed} from '@angular/core/testing';
import { EditarAgregarPeliculaComponent } from './editar-agregar-pelicula.component';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import {
    AngularFirestoreModule,
    SETTINGS,
    Settings,
  } from '@angular/fire/compat/firestore';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { Pelicula } from 'src/app/modelo/pelicula.model';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
describe ('EditarAgregarPeliculaComponent',()=>{
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
            EditarAgregarPeliculaComponent,
        
            ],
            providers:[
                PeliculaService
            ]
        }).compileComponents();
    })
    it('Deberia existir el genero de peliculas de Aventura',()=>{
        const fixture = TestBed.createComponent(EditarAgregarPeliculaComponent);
        const app = fixture.componentInstance;
        expect(app.generosDisponibles).toContain('Aventura');
    })
    it('Deberia existir un atributo id inicializado con un valor nulo',()=>{
        const fixture = TestBed.createComponent(EditarAgregarPeliculaComponent);
        const app = fixture.componentInstance;
        expect(app.id).toBeNull;
    })
})