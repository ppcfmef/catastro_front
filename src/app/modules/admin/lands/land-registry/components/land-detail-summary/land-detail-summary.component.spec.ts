import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandDetailSummaryComponent } from './land-detail-summary.component';

describe('LandDetailSummaryComponent', () => {
  let component: LandDetailSummaryComponent;
  let fixture: ComponentFixture<LandDetailSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandDetailSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandDetailSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
