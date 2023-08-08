import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsistencyContainerComponent } from './consistency-container.component';

describe('ConsistencyContainerComponent', () => {
  let component: ConsistencyContainerComponent;
  let fixture: ComponentFixture<ConsistencyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsistencyContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsistencyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
