import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapAnalysisMapComponent } from './gap-analysis-map.component';

describe('GapAnalysisMapComponent', () => {
  let component: GapAnalysisMapComponent;
  let fixture: ComponentFixture<GapAnalysisMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapAnalysisMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GapAnalysisMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
