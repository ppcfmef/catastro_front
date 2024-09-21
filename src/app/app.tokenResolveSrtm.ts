import { inject, Injectable } from '@angular/core';
import { AuthTokenStrmService } from './shared/services/authTokenStrm.service';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class TokenResolveSrtm {


    authTokenStrmService = inject(AuthTokenStrmService);

    resolve(): Observable<string> {
        return this.authTokenStrmService.getTokenSrtm();
    }

}


