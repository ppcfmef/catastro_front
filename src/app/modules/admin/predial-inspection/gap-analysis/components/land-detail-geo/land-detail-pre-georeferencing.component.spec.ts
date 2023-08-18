import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandDetailPreGeoreferencingComponent } from './land-detail-pre-georeferencing.component';

describe('LandDetailPreGeoreferencingComponent', () => {
  let component: LandDetailPreGeoreferencingComponent;
  let fixture: ComponentFixture<LandDetailPreGeoreferencingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandDetailPreGeoreferencingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandDetailPreGeoreferencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
