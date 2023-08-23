import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsWithoutLandComponent } from './points-without-land.component';

describe('PointsWithoutLandComponent', () => {
  let component: PointsWithoutLandComponent;
  let fixture: ComponentFixture<PointsWithoutLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsWithoutLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsWithoutLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
