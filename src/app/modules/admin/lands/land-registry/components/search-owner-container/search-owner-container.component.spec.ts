import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOwnerContainerComponent } from './search-owner-container.component';

describe('SearchOwnerContainerComponent', () => {
  let component: SearchOwnerContainerComponent;
  let fixture: ComponentFixture<SearchOwnerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOwnerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOwnerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
