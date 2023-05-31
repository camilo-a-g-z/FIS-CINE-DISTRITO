import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAgregarFuncionComponent } from './editar-agregar-funcion.component';

describe('EditarAgregarFuncionComponent', () => {
  let component: EditarAgregarFuncionComponent;
  let fixture: ComponentFixture<EditarAgregarFuncionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAgregarFuncionComponent]
    });
    fixture = TestBed.createComponent(EditarAgregarFuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
