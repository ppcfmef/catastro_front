import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentOfLoadPage } from './assignment-of-load.page';

describe('AssignmentOfLoadPage', () => {
  let component: AssignmentOfLoadPage;
  let fixture: ComponentFixture<AssignmentOfLoadPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentOfLoadPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentOfLoadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
