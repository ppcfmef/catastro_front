import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LandOwner } from '../interfaces/land-owner.interface';

@Injectable({
  providedIn: 'root'
})
export class LandRegistryService {

  apiUrl = environment.apiUrl;
  private landOwner$ = new BehaviorSubject<LandOwner>(null);

  constructor(
    private readonly http: HttpClient,
  ) { }

  setLandOwner(value: LandOwner): void {
    this.landOwner$.next(value);
  }

  getLandOwner(): Observable<LandOwner> {
    return this.landOwner$;
  }

  searchOwnerbyDocument(document: string): Observable<LandOwner> {
    return this.http.get<LandOwner>(`${this.apiUrl}/lands/owners/search/${document}/`);
  }

  saveOwner(data: LandOwner): Observable<LandOwner> {
    if (data.id) {
      return this.editOwner(data.id, data);
    }else {
      return this.createOwner(data);
    }
  }

  createOwner(data: LandOwner): Observable<LandOwner> {
    return this.http.post<LandOwner>(`${this.apiUrl}/lands/owners/register/`, data);
  }

  editOwner(id: number, data: LandOwner): Observable<LandOwner> {
    // Eliminando registros que el backend no modifica
    delete data['dni'];
    delete data['documentType'];
    return this.http.patch<LandOwner>(`${this.apiUrl}/lands/owners/register/${id}/`, data);
  }
}
