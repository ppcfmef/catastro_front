import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject, of, BehaviorSubject } from 'rxjs';
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

  private tableDataSubject = new BehaviorSubject<IdataLoad[]>([]);
  private webMapSubject = new BehaviorSubject<any>(null);
  private graphicsIdSubject = new BehaviorSubject<any>(null);
  public clearAllGraphics: EventEmitter<void> = new EventEmitter();
  public refreshLayer: EventEmitter<void> = new EventEmitter();

  constructor() { }

  // update state
  setTableData(data: IdataLoad[]): void {
    this.tableDataSubject.next(data);
  }

  // Get data of table
  getTableData() {
    return this.tableDataSubject.asObservable();
  }

  setWebMap(webMap: any) {
    this.webMapSubject.next(webMap);
  }

  getWebMap() {
    return this.webMapSubject.asObservable();
  }

  setGraphicsId(graphicsId: any) {
    this.graphicsIdSubject.next(graphicsId);
  }

  getGraphicsId() {
    return this.graphicsIdSubject.asObservable();
  }

  triggerClearAllGraphics() {
    this.clearAllGraphics.emit();
  }

  triggerRefreshLayer(id) {
    this.refreshLayer.emit(id);
  }
}


