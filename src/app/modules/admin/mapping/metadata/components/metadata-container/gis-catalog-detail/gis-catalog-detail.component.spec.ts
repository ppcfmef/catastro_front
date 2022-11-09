import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisCatalogDetailComponent } from './gis-catalog-detail.component';

describe('GisCatalogDetailComponent', () => {
  let component: GisCatalogDetailComponent;
  let fixture: ComponentFixture<GisCatalogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GisCatalogDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GisCatalogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
