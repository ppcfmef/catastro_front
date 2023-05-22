import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsistencyErrorTableComponent } from './consistency-error-table.component';

describe('ConsistencyErrorTableComponent', () => {
  let component: ConsistencyErrorTableComponent;
  let fixture: ComponentFixture<ConsistencyErrorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsistencyErrorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsistencyErrorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
