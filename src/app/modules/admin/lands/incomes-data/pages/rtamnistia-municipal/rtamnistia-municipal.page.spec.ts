import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTAmnistiaMunicipalPage } from './rtamnistia-municipal.page';

describe('RTAmnistiaMunicipalPage', () => {
  let component: RTAmnistiaMunicipalPage;
  let fixture: ComponentFixture<RTAmnistiaMunicipalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTAmnistiaMunicipalPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTAmnistiaMunicipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
