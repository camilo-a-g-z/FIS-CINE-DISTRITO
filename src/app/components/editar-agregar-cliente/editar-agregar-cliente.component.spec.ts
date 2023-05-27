import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAgregarClienteComponent } from './editar-agregar-cliente.component';

describe('EditarAgregarClienteComponent', () => {
  let component: EditarAgregarClienteComponent;
  let fixture: ComponentFixture<EditarAgregarClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAgregarClienteComponent]
    });
    fixture = TestBed.createComponent(EditarAgregarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
