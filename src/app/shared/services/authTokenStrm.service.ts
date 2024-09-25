/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { environment } from 'environments/environment';
import { get } from 'lodash';
import { COMMA } from 'mat-table-exporter';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenStrmService {

    public accessTokenExpiry: number | null = null;

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
                    'Cookie': 'visid_incap_3019525=VpkY3qCeT+G6RpV6lV8v6kv8vGYAAAAQUIPAAAAACRfWgREtxhjxFV4wOkprRU',
                    'Skip-Auth': 'true'
                },
                withCredentials: true
            }
        ).pipe(
            tap((response: any) =>{
                this.accessTokenSrtm = response.access_token;
                this.accessTokenExpiry = Date.now() + response.expires_in * 1000;
            }),
            catchError( err =>  of(false))
        );
    }
}

