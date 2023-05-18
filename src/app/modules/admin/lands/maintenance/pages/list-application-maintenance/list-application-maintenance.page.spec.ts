import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplicationMaintenancePage } from './list-application-maintenance.page';

describe('ListApplicationMaintenancePage', () => {
  let component: ListApplicationMaintenancePage;
  let fixture: ComponentFixture<ListApplicationMaintenancePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListApplicationMaintenancePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApplicationMaintenancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
