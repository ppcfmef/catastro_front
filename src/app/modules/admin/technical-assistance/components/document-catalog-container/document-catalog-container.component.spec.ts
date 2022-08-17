import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCatalogContainerComponent } from './document-catalog-container.component';

describe('DocumentCatalogContainerComponent', () => {
  let component: DocumentCatalogContainerComponent;
  let fixture: ComponentFixture<DocumentCatalogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCatalogContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCatalogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
