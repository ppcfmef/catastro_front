import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUbicacion } from '../interfaces/ubicacion.interface';
import { ITicket } from '../interfaces/ticket.interface';


@Injectable({
    providedIn: 'root',
})
export class ResultsService {

    public ubicacionSubject: Subject<{ubicacion: IUbicacion; ticket: ITicket}> = new Subject();
    public ticketSubject: Subject<ITicket> = new Subject();
    public estadoSubject: Subject<any> = new Subject();
    public pointSubject: Subject<any> = new Subject();
    public resetMapSubject: Subject<any> = new Subject();
    public ubigeoSubject: Subject<any> = new Subject();
    public generarNotificacionSubject: Subject<any> = new Subject();
    public viewSubject: Subject<any> = new Subject();
    constructor() { }

    setUbigeo(data: string): void{
        this.ubigeoSubject.next(data);
    }

    getUbigeo(): Observable<string> {
        return this.ubigeoSubject.asObservable();
    }
       setTicketData(data: ITicket): void {
        this.ticketSubject.next(data);
    }

    // Get ticket
    getTicketData(): Observable<ITicket> {
        return this.ticketSubject.asObservable();
    }

    // update ubicacion
    setUbicacionData(data: {ubicacion: IUbicacion; ticket: ITicket} ): void {
        this.ubicacionSubject.next(data);
    }

    // Get ubicacion
    getUbicacionData(): Observable<{ubicacion: IUbicacion; ticket: ITicket}> {
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

    setGenerarNotificacion(data: any ): void{
        this.generarNotificacionSubject.next(data);
    }

    getGenerarNotificacion(): Observable<any>{
        return this.generarNotificacionSubject;
    }

    setView(view: any): void{
        this.viewSubject.next(view);
    }

    getView(): Observable<any>{
        return this.viewSubject;
    }
}


