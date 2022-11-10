import {AfterViewInit, Component, Input, OnInit, Output, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import {Document} from '../../../interfaces/document.interface';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})

export class QuestionAnswerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() documents: Document[] = [];
  @Input() categories = [];
  @Output() selectCategory = new EventEmitter<string>();
  

  

  constructor() {
	}

  ngOnInit(): void {
     
	}

  ngAfterViewInit(): void {
     
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.categories){
      
    }
  }

  selectCategorie(id):void{
    for(let i= 0; i< this.categories.length; i++ ){
      if(this.categories[i].id==id){
        this.categories[i]['active'] = true;
      }else{
        this.categories[i]['active'] = false;
      }
    }

    this.selectCategory.emit(id);
  }
  


}



