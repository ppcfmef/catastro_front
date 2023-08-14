import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsManagementPage } from './results-management.page';

describe('ResultsManagementPage', () => {
  let component: ResultsManagementPage;
  let fixture: ComponentFixture<ResultsManagementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsManagementPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
