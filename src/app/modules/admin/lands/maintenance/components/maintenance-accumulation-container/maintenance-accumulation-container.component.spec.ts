import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceAccumulationContainerComponent } from './maintenance-accumulation-container.component';

describe('MaintenanceAccumulationContainerComponent', () => {
  let component: MaintenanceAccumulationContainerComponent;
  let fixture: ComponentFixture<MaintenanceAccumulationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceAccumulationContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceAccumulationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
