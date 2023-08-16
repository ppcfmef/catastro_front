import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandMapPreGeoreferencingComponent } from './land-map-pre-georeferencing.component';

describe('LandMapPreGeoreferencingComponent', () => {
  let component: LandMapPreGeoreferencingComponent;
  let fixture: ComponentFixture<LandMapPreGeoreferencingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandMapPreGeoreferencingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandMapPreGeoreferencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
