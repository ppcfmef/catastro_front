import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCatalogContainerComponent } from './tutorial-catalog-container.component';

describe('TutorialCatalogContainerComponent', () => {
  let component: TutorialCatalogContainerComponent;
  let fixture: ComponentFixture<TutorialCatalogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialCatalogContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialCatalogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
