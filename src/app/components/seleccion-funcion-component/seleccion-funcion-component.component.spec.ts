import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionFuncionComponentComponent } from './seleccion-funcion-component.component';

describe('SeleccionFuncionComponentComponent', () => {
  let component: SeleccionFuncionComponentComponent;
  let fixture: ComponentFixture<SeleccionFuncionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionFuncionComponentComponent]
    });
    fixture = TestBed.createComponent(SeleccionFuncionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
