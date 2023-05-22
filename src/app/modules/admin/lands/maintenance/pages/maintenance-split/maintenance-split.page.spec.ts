import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceSplitPage } from './maintenance-split.page';

describe('MaintenanceSplitPage', () => {
  let component: MaintenanceSplitPage;
  let fixture: ComponentFixture<MaintenanceSplitPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceSplitPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceSplitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
