import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOwnerLandPage } from './new-owner-land.page';

describe('NewOwnerLandPage', () => {
  let component: NewOwnerLandPage;
  let fixture: ComponentFixture<NewOwnerLandPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOwnerLandPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOwnerLandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
