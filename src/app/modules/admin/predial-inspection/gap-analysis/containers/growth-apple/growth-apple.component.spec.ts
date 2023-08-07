import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthAppleComponent } from './growth-apple.component';

describe('GrowthAppleComponent', () => {
  let component: GrowthAppleComponent;
  let fixture: ComponentFixture<GrowthAppleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowthAppleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthAppleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
