/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenStrmService {

    private _httpClient = inject(HttpClient);
    get accessTokenSrtm(): string
    {
        return localStorage.getItem('accessTokenSrtm') ?? '';
    }

    set accessTokenSrtm(token: string)
    {
        localStorage.setItem('accessTokenSrtm', token);
    }


    getTokenSrtm(): Observable<any> {
        const body = new URLSearchParams();
        body.set('username', environment.usernameSrtm);
        body.set('password', environment.passwordSrtm);
        body.set('grant_type', 'password');
        body.set('client_id', 'jwtClient');

        return this._httpClient.post(`${environment.authorizesrtm}/auth/realms/mef-comp5/protocol/openid-connect/token`, body.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'visid_incap_3019525=VpkY3qCeT+G6RpV6lV8v6kv8vGYAAAAQUIPAAAAACRfWgREtxhjxFV4wOkprRU'
                },
                withCredentials: true
            }
        ).pipe(
            tap((response: any) => this.accessTokenSrtm = response.access_token),
            catchError( err =>  of(false))
        );
    }
}
