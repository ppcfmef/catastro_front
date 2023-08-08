import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditioningContainerComponent } from './conditioning-container.component';

describe('ConditioningContainerComponent', () => {
  let component: ConditioningContainerComponent;
  let fixture: ComponentFixture<ConditioningContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditioningContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditioningContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
