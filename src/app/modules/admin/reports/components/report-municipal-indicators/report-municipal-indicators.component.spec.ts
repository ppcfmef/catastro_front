import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMunicipalIndicatorsComponent } from './report-municipal-indicators.component';

describe('ReportMunicipalIndicatorsComponent', () => {
  let component: ReportMunicipalIndicatorsComponent;
  let fixture: ComponentFixture<ReportMunicipalIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMunicipalIndicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMunicipalIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
