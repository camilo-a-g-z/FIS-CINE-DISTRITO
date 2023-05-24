import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionSillasComponentComponent } from './seleccion-sillas-component.component';

describe('SeleccionSillasComponentComponent', () => {
  let component: SeleccionSillasComponentComponent;
  let fixture: ComponentFixture<SeleccionSillasComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionSillasComponentComponent]
    });
    fixture = TestBed.createComponent(SeleccionSillasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
