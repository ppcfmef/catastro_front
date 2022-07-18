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

  createOwner(data: LandOwner): Observable<LandOwner> {
    return this.http.post<LandOwner>(`${this.apiUrl}/lands/owners/register/`, data);
  }
}
