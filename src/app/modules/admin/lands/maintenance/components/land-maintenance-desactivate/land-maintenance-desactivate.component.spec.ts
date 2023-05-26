import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandMaintenanceDesactivateComponent } from './land-maintenance-desactivate.component';

describe('LandMaintenanceDesactivateComponent', () => {
  let component: LandMaintenanceDesactivateComponent;
  let fixture: ComponentFixture<LandMaintenanceDesactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandMaintenanceDesactivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandMaintenanceDesactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
