import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAgregarMultiplexComponent } from './editar-agregar-multiplex.component';

describe('EditarAgregarMultiplexComponent', () => {
  let component: EditarAgregarMultiplexComponent;
  let fixture: ComponentFixture<EditarAgregarMultiplexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAgregarMultiplexComponent]
    });
    fixture = TestBed.createComponent(EditarAgregarMultiplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
