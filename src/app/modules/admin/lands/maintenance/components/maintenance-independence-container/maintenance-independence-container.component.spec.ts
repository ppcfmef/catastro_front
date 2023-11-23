import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceIndependenceContainerComponent } from './maintenance-independence-container.component';

describe('MaintenanceIndependenceContainerComponent', () => {
  let component: MaintenanceIndependenceContainerComponent;
  let fixture: ComponentFixture<MaintenanceIndependenceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceIndependenceContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceIndependenceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
