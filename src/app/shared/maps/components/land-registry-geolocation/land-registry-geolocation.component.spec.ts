import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandRegistryGeolocationComponent } from './land-registry-geolocation.component';

describe('LandRegistryGeolocationComponent', () => {
  let component: LandRegistryGeolocationComponent;
  let fixture: ComponentFixture<LandRegistryGeolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandRegistryGeolocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandRegistryGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
