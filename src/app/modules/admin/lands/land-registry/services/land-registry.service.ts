import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LandOwner } from '../interfaces/land-owner.interface';
import { LandRegistryMap } from '../interfaces/land-registry-map.interface';
import { IPagination } from 'app/core/common/interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class LandRegistryService {

  apiUrl = environment.apiUrl;
  private landOwner$ = new BehaviorSubject<LandOwner>(null);
  private landCreate$ = new BehaviorSubject<boolean>(false);
  private landRegister$ = new BehaviorSubject<LandRegistryMap>(null);

  constructor(
    private readonly http: HttpClient,
  ) { }

  setLandOwner(value: LandOwner): void {
    this.landOwner$.next(value);
  }

  getLandOwner(): Observable<LandOwner> {
    return this.landOwner$;
  }

  setLandCreate(value: boolean): void {
    // Genero el evento para crear un nuevo registro
    this.landCreate$.next(value);
  }

  getLandCreate(): Observable<boolean> {
    return this.landCreate$;
  }

  setLandRegister(value: LandRegistryMap): void {
    this.landRegister$.next(value);
  }

  getLandRegister(): Observable<LandRegistryMap> {
    return this.landRegister$;
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

  getLandList(queryParams): Observable<IPagination<LandRegistryMap>> {
    return this.http.get<IPagination<LandRegistryMap>>(`${this.apiUrl}/lands/records/`, {params: queryParams});
  }

  saveLand(data: LandRegistryMap): Observable<LandRegistryMap> {
    if (data.id) {
      return this.editLandRecord(data.id, data);
    }else {
      return this.createLandRecord(data);
    }
  }

  createLandRecord(data: LandRegistryMap): Observable<LandRegistryMap> {
    return this.http.post<LandRegistryMap>(`${this.apiUrl}/lands/register/`, data);
  }

  editLandRecord(id: number, data: LandRegistryMap): Observable<LandRegistryMap> {
    // Eliminando registros que el backend no modifica
    // delete data['<key>'];
    return this.http.patch<LandRegistryMap>(`${this.apiUrl}/lands/register/${id}/`, data);
  }
}
