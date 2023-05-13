import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceReassignmentPage } from './maintenance-reassignment.page';

describe('MaintenanceReassignmentPage', () => {
  let component: MaintenanceReassignmentPage;
  let fixture: ComponentFixture<MaintenanceReassignmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceReassignmentPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceReassignmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
