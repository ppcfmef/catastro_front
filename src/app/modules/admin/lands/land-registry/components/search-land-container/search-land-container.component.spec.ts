import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLandContainerComponent } from './search-land-container.component';

describe('SearchLandContainerComponent', () => {
  let component: SearchLandContainerComponent;
  let fixture: ComponentFixture<SearchLandContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLandContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLandContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
