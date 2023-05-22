import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceSplitContainerComponent } from './maintenance-split-container.component';

describe('MaintenanceSplitContainerComponent', () => {
  let component: MaintenanceSplitContainerComponent;
  let fixture: ComponentFixture<MaintenanceSplitContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceSplitContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceSplitContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
