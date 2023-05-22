import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLandMaintenanceContainerComponent } from './list-land-maintenance-container.component';

describe('ListLandMaintenanceContainerComponent', () => {
  let component: ListLandMaintenanceContainerComponent;
  let fixture: ComponentFixture<ListLandMaintenanceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLandMaintenanceContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLandMaintenanceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
