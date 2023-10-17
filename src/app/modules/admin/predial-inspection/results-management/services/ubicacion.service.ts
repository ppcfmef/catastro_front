import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { ticketMock, ticketMocks } from '../mocks/ticket.mock';
import { ubicacionMocks } from '../mocks/ubicacion.mock';
import { IUbicacion } from '../interfaces/ubicacion.interface';


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  apiUrl = environment.apiUrl;
  jsonUbicacionMocks: IUbicacion[];
  constructor(
    private http: HttpClient
  ) { }
  getData(): IUbicacion[]{

    let jsonUbicacionMocks=[];
    const stringUbicacionMocks=localStorage.getItem('ubicacionMocks');
    if (stringUbicacionMocks){
      jsonUbicacionMocks =JSON.parse(stringUbicacionMocks);
    }
    return jsonUbicacionMocks;
   }
  getList(queryParams?: any): Observable<IPagination<any>> {
    this.jsonUbicacionMocks = this.getData();
    /*if (queryParams){
      this.jsonUbicacionMocks = this.getData().filter((r: IUbicacion)=> r.ubigeo ===queryParams.codTicket);
    }*/
    const res: IPagination<any> = {
        count: 2,
        next: '0',
        previous: '0',
        results: this.jsonUbicacionMocks,
    };


    return new Observable((observer) => {
      observer.next(res);
    });
    //return this.http.get<IPagination<any>>(`${this.apiUrl}/gap-analisys/land/`, {params: queryParams});
  }

  get(id: number): Observable<any> {
    /*console.log('id>>',id);
    console.log('ubicacionMocks',ubicacionMocks);*/
    this.jsonUbicacionMocks = this.getData();
    const ubicaciones = this.jsonUbicacionMocks.filter(u=> u.id == id);
    /*console.log('id>>',ubicaciones);*/
    const res =  ubicaciones.length>0? ubicaciones[0]:{};
    return new Observable((observer) => {
      observer.next(res);
    });

  }

  update(id,data): Observable<IUbicacion> {
    //const res = ubicacionMocks[0];

    this.jsonUbicacionMocks =this.getData();
    /*const ticket: ITicket = this.jsonTicketMocks.find(t=> t.id == id);
    */
    const index=this.jsonUbicacionMocks.findIndex(t=> t.id == id);
    this.jsonUbicacionMocks[index]= data;
    
    localStorage.setItem('ubicacionMocks',JSON.stringify(this.jsonUbicacionMocks) ) ;
    const res = this.jsonUbicacionMocks[index];
    return new Observable((observer) => {
      observer.next(res);
    });
    //return this.http.patch<any>(`${this.apiUrl}/gap-analisys/land/${id}/`, data);
  }


}
