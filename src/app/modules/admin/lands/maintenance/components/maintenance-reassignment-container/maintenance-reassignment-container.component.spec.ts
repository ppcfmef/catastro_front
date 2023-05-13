import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceReassignmentContainerComponent } from './maintenance-reassignment-container.component';

describe('MaintenanceReassignmentContainerComponent', () => {
  let component: MaintenanceReassignmentContainerComponent;
  let fixture: ComponentFixture<MaintenanceReassignmentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceReassignmentContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceReassignmentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
