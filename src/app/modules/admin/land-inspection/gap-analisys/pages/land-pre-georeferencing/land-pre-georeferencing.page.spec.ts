import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPreGeoreferencingPage } from './land-pre-georeferencing.page';

describe('LandPreGeoreferencingPage', () => {
  let component: LandPreGeoreferencingPage;
  let fixture: ComponentFixture<LandPreGeoreferencingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandPreGeoreferencingPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandPreGeoreferencingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
