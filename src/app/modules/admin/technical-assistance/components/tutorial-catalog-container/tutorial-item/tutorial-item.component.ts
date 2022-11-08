import {Component, Input} from '@angular/core';
import {Document} from '../../../interfaces/document.interface';

@Component({
  selector: 'app-tutorial-item',
  templateUrl: './tutorial-item.component.html',
  styleUrls: ['./tutorial-item.component.scss']
})

export class TutorialItemComponent {
  @Input() documents: Document[] = [];
}
