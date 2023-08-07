import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAttendComponent } from './load-attend.component';

describe('LoadAttendComponent', () => {
  let component: LoadAttendComponent;
  let fixture: ComponentFixture<LoadAttendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadAttendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadAttendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
