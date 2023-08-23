import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentOfLoadContainerComponent } from './assignment-of-load-container.component';

describe('AssignmentOfLoadContainerComponent', () => {
  let component: AssignmentOfLoadContainerComponent;
  let fixture: ComponentFixture<AssignmentOfLoadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentOfLoadContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentOfLoadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
