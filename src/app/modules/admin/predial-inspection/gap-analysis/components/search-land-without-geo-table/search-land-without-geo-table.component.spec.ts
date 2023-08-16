import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLandWithoutGeoTableComponent } from './search-land-without-geo-table.component';

describe('SearchLandWithoutGeoTableComponent', () => {
  let component: SearchLandWithoutGeoTableComponent;
  let fixture: ComponentFixture<SearchLandWithoutGeoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLandWithoutGeoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLandWithoutGeoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
