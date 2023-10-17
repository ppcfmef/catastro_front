import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUbicacion } from '../interfaces/ubicacion.interface';


@Injectable({
    providedIn: 'root',
})
export class ResultsService {

    public ubicacionSubject: Subject<IUbicacion> = new Subject();
    public estadoSubject: Subject<any> = new Subject();
    public pointSubject: Subject<any> = new Subject();
    public resetMapSubject: Subject<any> = new Subject();
    constructor() { }

    // update ubicacion
    setUbicacionData(data: IUbicacion): void {
        this.ubicacionSubject.next(data);
    }

    // Get ubicacion
    getUbicacionData(): Observable<IUbicacion> {
        return this.ubicacionSubject.asObservable();
    }

    setEstado(data: any): void {
        this.estadoSubject.next(data);
    }

    getEstado(): Observable<any>{
        return this.estadoSubject.asObservable();
    }

    setPoint(data: any): void{
        this.pointSubject.next(data);
    }

    getPoint(): Observable<any>{
        return this.pointSubject.asObservable();
    }

    setResetMap(type?: number): void{
        this.resetMapSubject.next(type);
    }

    getResetMap(): Observable<any>{
        return this.resetMapSubject.asObservable();
    }
}


