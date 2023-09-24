import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IdataLoad } from '../interfaces/dataload.interface';

@Injectable({
    providedIn: 'root',
})
export class NewLoadService {

    public showIcon: Subject<boolean> = new Subject();
    public deleteAllGraphicsMap: Subject<boolean> = new Subject();
    public dataMap: Subject<any> = new Subject();
    public oid: Subject<string> = new Subject();
    public clearAllGraphics: EventEmitter<void> = new EventEmitter();
    public refreshLayer: EventEmitter<void> = new EventEmitter();
    private tableDataSubject = new BehaviorSubject<IdataLoad[]>([]);
    private graphicsIdSubject = new BehaviorSubject<any>(null);
    private rowZoomNewWorkLoad = new Subject<any>();  // @daniel
    constructor() { }

    // update state
    setTableData(data: IdataLoad[]): void {
        this.tableDataSubject.next(data);
    }

    // Get data of table
    getTableData(): Observable<IdataLoad[]> {
        return this.tableDataSubject.asObservable();
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
    // @daniel
    emitRowZoomNewWorkLoad(row): void {
        this.rowZoomNewWorkLoad.next(row);
    }

    // @daniel
    getRowZoomNewWorkLoad(): Observable<any> {
        return this.rowZoomNewWorkLoad.asObservable();
    }
}


