import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SearchLandTableComponent } from './search-land-table.component';

describe('SearchLandTableComponent', () => {
  let component: SearchLandTableComponent;
  let fixture: ComponentFixture<SearchLandTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSortModule],
      declarations: [ SearchLandTableComponent, MatPaginator, MatSort ]
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
