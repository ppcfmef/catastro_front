import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSituationalComponent } from './report-situational.component';

describe('ReportSituationalComponent', () => {
  let component: ReportSituationalComponent;
  let fixture: ComponentFixture<ReportSituationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSituationalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSituationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
