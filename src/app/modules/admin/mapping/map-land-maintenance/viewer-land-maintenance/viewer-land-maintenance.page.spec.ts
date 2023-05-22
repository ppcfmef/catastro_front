import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerLandMaintenancePage } from './viewer-land-maintenance.page';

describe('ViewerLandMaintenancePage', () => {
  let component: ViewerLandMaintenancePage;
  let fixture: ComponentFixture<ViewerLandMaintenancePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerLandMaintenancePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerLandMaintenancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
