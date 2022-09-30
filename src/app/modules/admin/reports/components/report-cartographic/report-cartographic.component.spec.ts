import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCartographicComponent } from './report-cartographic.component';

describe('ReportCartographicComponent', () => {
  let component: ReportCartographicComponent;
  let fixture: ComponentFixture<ReportCartographicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCartographicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCartographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
