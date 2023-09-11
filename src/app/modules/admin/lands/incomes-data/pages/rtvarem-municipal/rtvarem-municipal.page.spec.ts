import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTVaremMunicipalPage } from './rtvarem-municipal.page';

describe('RTVaremMunicipalPage', () => {
  let component: RTVaremMunicipalPage;
  let fixture: ComponentFixture<RTVaremMunicipalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTVaremMunicipalPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTVaremMunicipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
