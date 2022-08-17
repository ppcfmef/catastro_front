import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCatalogPage } from './document-catalog.page';

describe('DocumentCatalogPage', () => {
  let component: DocumentCatalogPage;
  let fixture: ComponentFixture<DocumentCatalogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCatalogPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCatalogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
