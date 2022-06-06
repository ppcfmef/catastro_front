import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandSummaryTableComponent } from './land-summary-table.component';

describe('LandSummaryTableComponent', () => {
  let component: LandSummaryTableComponent;
  let fixture: ComponentFixture<LandSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandSummaryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
