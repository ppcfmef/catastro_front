import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTContribuyentePage } from './rtcontribuyente.page';

describe('RTContribuyentePage', () => {
  let component: RTContribuyentePage;
  let fixture: ComponentFixture<RTContribuyentePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTContribuyentePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTContribuyentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
