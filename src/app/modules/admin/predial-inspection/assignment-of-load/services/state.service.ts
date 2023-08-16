import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

@Output() state: EventEmitter<boolean> = new EventEmitter();

constructor() { }

}


