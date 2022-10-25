import {Component, Input} from '@angular/core';
import {Document} from '../../../interfaces/document.interface';

@Component({
  selector: 'app-document-catalog-list',
  templateUrl: './document-catalog-list.component.html',
  styleUrls: ['./document-catalog-list.component.scss']
})

export class DocumentCatalogListComponent {
  @Input() documents: Document[] = [];
}
