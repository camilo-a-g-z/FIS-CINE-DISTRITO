import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCompraComponentComponent } from './resumen-compra-component.component';

describe('ResumenCompraComponentComponent', () => {
  let component: ResumenCompraComponentComponent;
  let fixture: ComponentFixture<ResumenCompraComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenCompraComponentComponent]
    });
    fixture = TestBed.createComponent(ResumenCompraComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
