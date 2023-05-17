import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportControlNationalComponent } from './report-control-national.component';

describe('ReportControlNationalComponent', () => {
  let component: ReportControlNationalComponent;
  let fixture: ComponentFixture<ReportControlNationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportControlNationalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportControlNationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
