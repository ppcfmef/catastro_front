import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLoadComponent } from './assign-load.component';

describe('AssignLoadComponent', () => {
  let component: AssignLoadComponent;
  let fixture: ComponentFixture<AssignLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
