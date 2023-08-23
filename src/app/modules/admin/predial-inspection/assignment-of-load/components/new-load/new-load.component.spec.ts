import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoadComponent } from './new-load.component';

describe('NewLoadComponent', () => {
  let component: NewLoadComponent;
  let fixture: ComponentFixture<NewLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
