import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAgregarPeliculaComponent } from './editar-agregar-pelicula.component';

describe('EditarAgregarPeliculaComponent', () => {
  let component: EditarAgregarPeliculaComponent;
  let fixture: ComponentFixture<EditarAgregarPeliculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAgregarPeliculaComponent]
    });
    fixture = TestBed.createComponent(EditarAgregarPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
