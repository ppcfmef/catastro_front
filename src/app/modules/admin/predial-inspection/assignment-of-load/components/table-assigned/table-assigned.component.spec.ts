import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAssignedComponent } from './table-assigned.component';

describe('TableAssignedComponent', () => {
  let component: TableAssignedComponent;
  let fixture: ComponentFixture<TableAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAssignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
