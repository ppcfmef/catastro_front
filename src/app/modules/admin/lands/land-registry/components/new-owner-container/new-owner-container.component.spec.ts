import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOwnerContainerComponent } from './new-owner-container.component';

describe('NewOwnerContainerComponent', () => {
  let component: NewOwnerContainerComponent;
  let fixture: ComponentFixture<NewOwnerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOwnerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOwnerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
