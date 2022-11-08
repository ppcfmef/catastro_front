import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCatalogFilterComponent } from './document-catalog-filter.component';

describe('DocumentCatalogFilterComponent', () => {
  let component: DocumentCatalogFilterComponent;
  let fixture: ComponentFixture<DocumentCatalogFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCatalogFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCatalogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
