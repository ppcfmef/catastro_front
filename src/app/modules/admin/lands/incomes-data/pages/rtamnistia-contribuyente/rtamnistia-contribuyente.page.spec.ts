import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTAmnistiaContribuyentePage } from './rtamnistia-contribuyente.page';

describe('RTAmnistiaContribuyentePage', () => {
  let component: RTAmnistiaContribuyentePage;
  let fixture: ComponentFixture<RTAmnistiaContribuyentePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTAmnistiaContribuyentePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTAmnistiaContribuyentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
