import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentOfLoadPendingComponent } from './assignment-of-load-pending.component';

describe('AssignmentOfLoadPendingComponent', () => {
  let component: AssignmentOfLoadPendingComponent;
  let fixture: ComponentFixture<AssignmentOfLoadPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentOfLoadPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentOfLoadPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
