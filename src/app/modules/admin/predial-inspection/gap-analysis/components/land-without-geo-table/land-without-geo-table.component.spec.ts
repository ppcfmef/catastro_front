import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandWithoutGeoTableComponent } from './land-without-geo-table.component';

describe('LandWithoutGeoTableComponent', () => {
  let component: LandWithoutGeoTableComponent;
  let fixture: ComponentFixture<LandWithoutGeoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandWithoutGeoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandWithoutGeoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
