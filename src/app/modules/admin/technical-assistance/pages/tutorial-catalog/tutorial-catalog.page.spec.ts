import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCatalogPage } from './tutorial-catalog.page';

describe('TutorialCatalogPage', () => {
  let component: TutorialCatalogPage;
  let fixture: ComponentFixture<TutorialCatalogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialCatalogPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialCatalogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
