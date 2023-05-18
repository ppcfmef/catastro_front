import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplicationMaintenanceContainerComponent } from './list-application-maintenance-container.component';

describe('ListApplicationMaintenanceContainerComponent', () => {
  let component: ListApplicationMaintenanceContainerComponent;
  let fixture: ComponentFixture<ListApplicationMaintenanceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListApplicationMaintenanceContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApplicationMaintenanceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
