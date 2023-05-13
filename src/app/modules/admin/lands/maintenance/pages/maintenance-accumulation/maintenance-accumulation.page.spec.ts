import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceAccumulationPage } from './maintenance-accumulation.page';

describe('MaintenanceAccumulationPage', () => {
  let component: MaintenanceAccumulationPage;
  let fixture: ComponentFixture<MaintenanceAccumulationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceAccumulationPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceAccumulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
