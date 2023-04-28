import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { SearchByLandPage } from './search-by-land.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NewSearchByLandPage', () => {
  let component: SearchByLandPage;
  let fixture: ComponentFixture<SearchByLandPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [ SearchByLandPage ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByLandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search-land-container', () => {
    fixture = TestBed.createComponent(SearchByLandPage);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-search-land-container')).not.toBe(null);
  });
});
