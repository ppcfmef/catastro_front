import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapAnalysisBlockListComponent } from './gap-analysis-block-list.component';

describe('GapAnalysisBlockListComponent', () => {
  let component: GapAnalysisBlockListComponent;
  let fixture: ComponentFixture<GapAnalysisBlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapAnalysisBlockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GapAnalysisBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
