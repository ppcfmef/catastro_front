import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IdataLoad } from '../interfaces/dataload.interface';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    @Output() state: EventEmitter<boolean> = new EventEmitter();

    @Output() row: EventEmitter<any> = new EventEmitter();

    @Output() deleteAll: EventEmitter<boolean> = new EventEmitter();
    @Output() stateRowdeleted: EventEmitter<boolean> = new EventEmitter();
    @Output() updatewidget: EventEmitter<boolean> = new EventEmitter();
    public functiondelete = new EventEmitter<any>();
    public clearAllGraphics: EventEmitter<void> = new EventEmitter();
    public refreshLayer: EventEmitter<void> = new EventEmitter();
    private tableDataSubject = new BehaviorSubject<IdataLoad[]>([]);
    private webMapSubject = new BehaviorSubject<any>(null);
    private graphicsIdSubject = new BehaviorSubject<any>(null);


    private rowDeleted = new Subject<any>();
    constructor() {}

    // update state
    setTableData(data: IdataLoad[]): void {
        this.tableDataSubject.next(data);
    }

    // Get data of table
    getTableData(): Observable<IdataLoad[]> {
        return this.tableDataSubject.asObservable();
    }

    setWebMap(webMap: any): void {
        this.webMapSubject.next(webMap);
    }

    getWebMap(): Observable<any> {
        return this.webMapSubject.asObservable();
    }

    setGraphicsId(graphicsId: any): void {
        this.graphicsIdSubject.next(graphicsId);
    }

    getGraphicsId(): Observable<any> {
        return this.graphicsIdSubject.asObservable();
    }

    triggerClearAllGraphics(): void {
        this.clearAllGraphics.emit();
    }

    triggerRefreshLayer(id): void {
        this.refreshLayer.emit(id);
    }

    emitRowDelete(row): void {
        this.rowDeleted.next(row);
    }

    getRowtDelete(): Observable<any> {
        return this.rowDeleted.asObservable();
    }
}


