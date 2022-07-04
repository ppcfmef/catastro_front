import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerLandDetailComponent } from './owner-land-detail.component';

describe('OwnerLandDetailComponent', () => {
  let component: OwnerLandDetailComponent;
  let fixture: ComponentFixture<OwnerLandDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerLandDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerLandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
