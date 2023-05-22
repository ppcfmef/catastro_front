import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLandMaintenanceTableComponent } from './list-land-maintenance-table.component';

describe('ListLandMaintenanceTableComponent', () => {
  let component: ListLandMaintenanceTableComponent;
  let fixture: ComponentFixture<ListLandMaintenanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLandMaintenanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLandMaintenanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
