import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLandComponent } from './sub-land.component';

describe('SubLandComponent', () => {
  let component: SubLandComponent;
  let fixture: ComponentFixture<SubLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
