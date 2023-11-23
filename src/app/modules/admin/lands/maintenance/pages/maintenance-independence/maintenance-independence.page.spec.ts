import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceIndependencePage } from './maintenance-independence.page';

describe('MaintenanceIndependencePage', () => {
  let component: MaintenanceIndependencePage;
  let fixture: ComponentFixture<MaintenanceIndependencePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceIndependencePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceIndependencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
