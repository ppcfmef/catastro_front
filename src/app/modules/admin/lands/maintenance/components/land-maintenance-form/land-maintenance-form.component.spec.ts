import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandMaintenanceFormComponent } from './land-maintenance-form.component';

describe('LandMaintenanceFormComponent', () => {
  let component: LandMaintenanceFormComponent;
  let fixture: ComponentFixture<LandMaintenanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandMaintenanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandMaintenanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
