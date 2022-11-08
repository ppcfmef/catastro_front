import {Component, Input} from '@angular/core';
import {Document} from '../../../interfaces/document.interface';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})

export class QuestionAnswerComponent {
  @Input() documents: Document[] = [];
}
