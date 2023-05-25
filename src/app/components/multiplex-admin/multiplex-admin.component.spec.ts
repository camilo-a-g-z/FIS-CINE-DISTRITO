import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplexAdminComponent } from './multiplex-admin.component';

describe('MultiplexAdminComponent', () => {
  let component: MultiplexAdminComponent;
  let fixture: ComponentFixture<MultiplexAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiplexAdminComponent]
    });
    fixture = TestBed.createComponent(MultiplexAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
