import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOwnerTableComponent } from './search-owner-table.component';

describe('SearchOwnerTableComponent', () => {
  let component: SearchOwnerTableComponent;
  let fixture: ComponentFixture<SearchOwnerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOwnerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOwnerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
