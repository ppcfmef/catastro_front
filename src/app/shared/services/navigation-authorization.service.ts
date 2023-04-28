import { Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Injectable({
  providedIn: 'root'
})
export class NavigationAuthorizationService {

  apiUrl = environment.apiUrl;
  private ubigeo$: Subject<string> = new Subject();

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  set ubigeoNavigation(ubigeo: string) {
    this.ubigeo$.next(ubigeo);
  }

  get ubigeoNavigation$(): Observable<string> {
      return this.ubigeo$.asObservable();
  }

  hasPermission(id: string, permissionType: string ): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/common/navigation/authorization/`,
      { id: id, permissionType: permissionType }
    ).pipe(
      catchError(() => of(false))
    );
  }

  userScopePermission(idView: string, permissionType = 'read_all'): Observable<{ubigeo: string | null; limitScope: boolean}> {
    return this.userService.user$
    .pipe(
      switchMap((user: User) => {
        const data = {ubigeo: user.ubigeo, limitScope: true};
        const permissionsNavigation: any[] = user?.permissionsNavigation || [];
        const readAll = permissionsNavigation.filter((p: any)=>(p?.navigationView === idView && p?.type === permissionType));
        if(readAll.length>0 || user.isSuperuser || user.placeScope?.id === 1){
          data.ubigeo = null;
          data.limitScope = false;
        }
        return of(data);
      })
    );
  };
}
