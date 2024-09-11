import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckTicketService {

    checkTicket$ = new BehaviorSubject<boolean>(false);
    dataTicket$ = new BehaviorSubject<any>(null);
    resolverTicket$ = new BehaviorSubject<string>('');
  constructor() { }

}
