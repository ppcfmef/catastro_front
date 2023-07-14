import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandWithoutGeoreferencingComponent } from './land-without-georeferencing.component';

describe('LandWithoutGeoreferencingComponent', () => {
  let component: LandWithoutGeoreferencingComponent;
  let fixture: ComponentFixture<LandWithoutGeoreferencingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandWithoutGeoreferencingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandWithoutGeoreferencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
