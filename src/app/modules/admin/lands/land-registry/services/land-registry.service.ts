import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { HtmlAstPath } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LandRegistryService {

  apiUrl = environment.apiUrl;

  constructor(
    private readonly html: HttpClient,
  ) { }

  searchOwnerbyDocument(document: string): Observable<any> {
    return this.html.get<any>(`${this.apiUrl}/lands/owners/search/${document}/`);
  }
}
