import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationAuthorizationService {

  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  hasPermission(id: string, permissionType: string ): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/common/navigation/authorization/`,
      { id: id, permissionType: permissionType }
    ).pipe(
      catchError(() => of(false))
    );
  }
}
