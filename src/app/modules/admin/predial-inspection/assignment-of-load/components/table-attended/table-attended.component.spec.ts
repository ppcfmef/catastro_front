import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAttendedComponent } from './table-attended.component';

describe('TableAttendedComponent', () => {
  let component: TableAttendedComponent;
  let fixture: ComponentFixture<TableAttendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAttendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
