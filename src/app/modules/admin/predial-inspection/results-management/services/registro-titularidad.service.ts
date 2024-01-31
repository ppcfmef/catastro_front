
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IRegistroTitularidad } from '../interfaces/registro-titularidad.interface';
import { FormUtils } from 'app/shared/utils/form.utils';



@Injectable({
  providedIn: 'root'
})
export class RegistroTitularidadService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  get(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inspection/recordowner/${id}` );

  }

  update(id,data): Observable<any> {

    const formData=FormUtils.parseToFormData(data,'pdf');
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.patch<any>(`${this.apiUrl}/inspection/recordowner/${id}/`, formData,{headers});
  }

  /*uploadFile(data: any): Observable<any> {
    const formData= new FormData();
    const headers = new HttpHeaders();
    formData.append('id_app', data.id_app);
    formData.append('file', data.file_notificacion);
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${this.apiUrl}/maintenance/application/upload-file/`, formData,{headers});
  }*/

  generarNotificacion(data): Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/pdf');
    return this.http.post<any>(`${this.apiUrl}/inspection/export-pdf/generar_notificacion/`, data,{responseType: 'blob' as 'json' });
  }
  generarNotificacionSubvaluado(data): Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/pdf');
    return this.http.post<any>(`${this.apiUrl}/inspection/export-pdf/generar_notificacion_subvaluado/`, data,{responseType: 'blob' as 'json' });
  }
  updateNotificacion(id,data): Observable<any> {
    const formData= new FormData();
    const headers = new HttpHeaders();
    formData.append('id_app', data.id_app);
    formData.append('file', data.file_notificacion);
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.patch<any>(`${this.apiUrl}/inspection/recordowner/${id}/`, data);
  }
}
