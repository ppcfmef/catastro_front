import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DocumentCatalogService} from '../../services/document-catalog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatPaginator} from '@angular/material/paginator';

import { DocumentCatalogContainerComponent } from './document-catalog-container.component';

describe('DocumentCatalogContainerComponent', () => {
  let component: DocumentCatalogContainerComponent;
  let fixture: ComponentFixture<DocumentCatalogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCatalogContainerComponent, MatPaginator ],
      providers: [DocumentCatalogService],
      imports: [HttpClientTestingModule]
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
