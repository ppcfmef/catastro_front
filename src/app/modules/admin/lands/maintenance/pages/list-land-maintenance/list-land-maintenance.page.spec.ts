import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLandMaintenancePage } from './list-land-maintenance.page';

describe('ListLandMaintenancePage', () => {
  let component: ListLandMaintenancePage;
  let fixture: ComponentFixture<ListLandMaintenancePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLandMaintenancePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLandMaintenancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
