import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplicationMaintenanceTableComponent } from './list-application-maintenance-table.component';

describe('ListApplicationMaintenanceTableComponent', () => {
  let component: ListApplicationMaintenanceTableComponent;
  let fixture: ComponentFixture<ListApplicationMaintenanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListApplicationMaintenanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApplicationMaintenanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
