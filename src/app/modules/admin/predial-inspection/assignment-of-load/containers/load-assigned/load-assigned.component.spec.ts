import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAssignedComponent } from './load-assigned.component';

describe('LoadAssignedComponent', () => {
  let component: LoadAssignedComponent;
  let fixture: ComponentFixture<LoadAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadAssignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
