import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlaceholderComponent } from './search-placeholder.component';

describe('SearchPlaceholderComponent', () => {
  let component: SearchPlaceholderComponent;
  let fixture: ComponentFixture<SearchPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
