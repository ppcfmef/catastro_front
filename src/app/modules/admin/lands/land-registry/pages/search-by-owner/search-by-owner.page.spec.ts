import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { SearchByOwnerPage } from './search-by-owner.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NewSearchByOwnerPage', () => {
  let component: SearchByOwnerPage;
  let fixture: ComponentFixture<SearchByOwnerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [ SearchByOwnerPage ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByOwnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search-owner-container', () => {
    fixture = TestBed.createComponent(SearchByOwnerPage);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-search-owner-container')).not.toBe(null);
  });
});
