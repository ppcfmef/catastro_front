import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapAnalysisPage } from './gap-analysis.page';

describe('GapAnalysisPage', () => {
  let component: GapAnalysisPage;
  let fixture: ComponentFixture<GapAnalysisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapAnalysisPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GapAnalysisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
