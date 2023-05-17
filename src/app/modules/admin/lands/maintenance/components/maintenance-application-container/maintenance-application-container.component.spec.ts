import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceApplicationContainerComponent } from './maintenance-application-container.component';

describe('MaintenanceApplicationContainerComponent', () => {
  let component: MaintenanceApplicationContainerComponent;
  let fixture: ComponentFixture<MaintenanceApplicationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceApplicationContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceApplicationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
