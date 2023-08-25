import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailTableService {
    private row = new BehaviorSubject<any>(null);
  constructor() { }

     setRow(data): void {
        this.row.next(data);
    }

    getRow(): Observable<any> {
        return this.row.asObservable();
    }
}
