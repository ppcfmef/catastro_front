import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerLandCreateAndEditComponent } from './owner-land-create-and-edit.component';

describe('OwnerLandCreateAndEditComponent', () => {
  let component: OwnerLandCreateAndEditComponent;
  let fixture: ComponentFixture<OwnerLandCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerLandCreateAndEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerLandCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
