import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAgregarSalaComponent } from './editar-agregar-sala.component';

describe('EditarAgregarSalaComponent', () => {
  let component: EditarAgregarSalaComponent;
  let fixture: ComponentFixture<EditarAgregarSalaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAgregarSalaComponent]
    });
    fixture = TestBed.createComponent(EditarAgregarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
