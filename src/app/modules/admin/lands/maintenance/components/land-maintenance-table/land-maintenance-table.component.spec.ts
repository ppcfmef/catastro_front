import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandMaintenanceTableComponent } from './land-maintenance-table.component';

describe('LandMaintenanceTableComponent', () => {
  let component: LandMaintenanceTableComponent;
  let fixture: ComponentFixture<LandMaintenanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandMaintenanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandMaintenanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
