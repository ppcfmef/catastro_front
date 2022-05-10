import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLandTableComponent } from './search-land-table.component';

describe('SearchLandTableComponent', () => {
  let component: SearchLandTableComponent;
  let fixture: ComponentFixture<SearchLandTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLandTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
