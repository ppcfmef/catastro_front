import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavigationAuthorizationService } from '../services/navigation-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationAuthorizationGuard implements CanActivate {
  constructor(
    private navigationAuthorizationService: NavigationAuthorizationService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const redirectURL = '';
    const id = route.data?.id;
    const permissionType = route.data?.permissionType;
    if (!id && !permissionType) {
      return true;
    }
    return this.navigationAuthorizationService.hasPermission(id, permissionType)
    .pipe(
      switchMap((authorization) => {
          if ( !authorization )
          {
              this.router.navigate(['/errors/not-authorization'], {queryParams: {redirectURL}});
              return of(false);
          }

          return of(true);
      })
    );
  }
}
