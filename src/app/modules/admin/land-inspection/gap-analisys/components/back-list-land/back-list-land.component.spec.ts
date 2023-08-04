import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackListLandComponent } from './back-list-land.component';

describe('BackListLandComponent', () => {
  let component: BackListLandComponent;
  let fixture: ComponentFixture<BackListLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackListLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackListLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
