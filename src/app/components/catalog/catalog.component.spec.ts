import{ TestBed} from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import {
    AngularFirestoreModule,
    SETTINGS,
    Settings,
  } from '@angular/fire/compat/firestore';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { environment } from 'src/environments/environment';
describe ('CatalogComponent',()=>{
    beforeEach(async()=>{
     
        await TestBed.configureTestingModule({
            imports:[
                AngularFireModule,
                AngularFirestoreModule,
                AngularFireModule.initializeApp(environment.firestore),
                    RouterModule.forRoot([
                    // Definición de rutas
                  ])
            ],
            declarations:[
            CatalogComponent,
        
            ],
            providers:[
                PeliculaService
            ]
        }).compileComponents();
    })
    it('Deberia existir un arreglo de peliculas',()=>{
        const fixture = TestBed.createComponent(CatalogComponent);
        const app = fixture.componentInstance;
        expect(app.peliculas).toBeTruthy;
    })
    it('El objeto pelicula debe crearse pero no contener informacion aka no definido',()=>{
        const fixture = TestBed.createComponent(CatalogComponent);
        const app = fixture.componentInstance;
        expect(app.pelicula).not.toBeDefined;
    })
})