import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceApplicationComponent } from './maintenance-application.component';

describe('MaintenanceApplicationComponent', () => {
  let component: MaintenanceApplicationComponent;
  let fixture: ComponentFixture<MaintenanceApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
