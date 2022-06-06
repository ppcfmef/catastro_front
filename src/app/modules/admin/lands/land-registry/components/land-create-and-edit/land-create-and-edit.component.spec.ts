import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandCreateAndEditComponent } from './land-create-and-edit.component';

describe('LandCreateAndEditComponent', () => {
  let component: LandCreateAndEditComponent;
  let fixture: ComponentFixture<LandCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandCreateAndEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
