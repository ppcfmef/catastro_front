import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPendingAssignmentComponent } from './load-pending-assignment.component';

describe('LoadPendingAssignmentComponent', () => {
  let component: LoadPendingAssignmentComponent;
  let fixture: ComponentFixture<LoadPendingAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPendingAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPendingAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
