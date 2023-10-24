import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { ticketMock, ticketMocks } from '../mocks/ticket.mock';
import { ITicket } from '../interfaces/ticket.interface';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  apiUrl = environment.apiUrl;
  jsonTicketMocks =[];
  constructor(
    private http: HttpClient
  ) {
    

   }

   getData(): ITicket[]{

    let jsonTicketMocks=[];
    const stringTicketMocks=localStorage.getItem('ticketMocks');
    if (stringTicketMocks){
      jsonTicketMocks =JSON.parse(stringTicketMocks);
    }
    return jsonTicketMocks;
   }

  getList(queryParams?: any): Observable<IPagination<any>> {
    /*localStorage.setItem('ticketMocks', JSON.stringify(ticketMocks));*/
    this.jsonTicketMocks = this.getData();
    if (queryParams && queryParams.codTicket){
      this.jsonTicketMocks =  this.jsonTicketMocks.filter((r: ITicket)=> r.codTicket ===queryParams.codTicket);
    }
     if (queryParams && queryParams.codEstTrabajoTicket){
      this.jsonTicketMocks = this.jsonTicketMocks.filter((r: ITicket)=> r.codEstTrabajoTicket ===queryParams.codEstTrabajoTicket);
    }

    const res: IPagination<any> = {
        count: this.jsonTicketMocks.length,
        next: '0',
        previous: '0',
        results: this.jsonTicketMocks,
    };

    return new Observable((observer) => {
      observer.next(res);
    });
    //return this.http.get<IPagination<any>>(`${this.apiUrl}/gap-analisys/land/`, {params: queryParams});
  }

  get(id: number): Observable<any> {
    this.jsonTicketMocks =this.getData();
    const ticket = this.jsonTicketMocks.filter(t=> t.id == id);
    const res =  this.jsonTicketMocks.length>0? ticket[0]:{};
    //console.log('res>>',res);

    return new Observable((observer) => {
      observer.next(res);
    });

  }

  update(id,data: ITicket): Observable<any> {
    this.jsonTicketMocks =this.getData();
    /*const ticket: ITicket = this.jsonTicketMocks.find(t=> t.id == id);
    */
    const index=this.jsonTicketMocks.findIndex(t=> t.id == id);
    this.jsonTicketMocks[index]= data;
    localStorage.setItem('ticketMocks',JSON.stringify(this.jsonTicketMocks) ) ;
    const res = data;
    return new Observable((observer) => {
      observer.next(res);
    });
    //return this.http.patch<any>(`${this.apiUrl}/gap-analisys/land/${id}/`, data);
  }


}
