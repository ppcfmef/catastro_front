import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LandOwner } from '../interfaces/land-owner.interface';

@Injectable({
  providedIn: 'root'
})
export class LandRegistryService {

  apiUrl = environment.apiUrl;
  private landOwner$: Subject<LandOwner> = new Subject();

  constructor(
    private readonly html: HttpClient,
  ) { }

  setLandOwner(value: LandOwner): void {
    this.landOwner$.next(value);
  }

  getLandOwner(): Observable<LandOwner> {
    return this.landOwner$.asObservable();
  }

  searchOwnerbyDocument(document: string): Observable<LandOwner> {
    return this.html.get<LandOwner>(`${this.apiUrl}/lands/owners/search/${document}/`);
  }
}
