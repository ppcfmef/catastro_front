import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject, of } from 'rxjs';
import { state } from '@angular/animations';
import { illegalData } from 'highlight.js';
import { IdataLoad } from '../interfaces/dataload.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {

@Output() state: EventEmitter<boolean> = new EventEmitter();

@Output() row: EventEmitter<any> = new EventEmitter();

@Output() deleteAll: EventEmitter<boolean> = new EventEmitter();

constructor() { }

}


