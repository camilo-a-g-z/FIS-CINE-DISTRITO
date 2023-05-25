import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosAdminComponent } from './empleados-admin.component';

describe('EmpleadosAdminComponent', () => {
  let component: EmpleadosAdminComponent;
  let fixture: ComponentFixture<EmpleadosAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadosAdminComponent]
    });
    fixture = TestBed.createComponent(EmpleadosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
