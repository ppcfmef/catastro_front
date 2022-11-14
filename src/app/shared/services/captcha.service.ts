import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IntegrateBusiness, IntegratePerson} from '../interfaces/integrations.inteface';
import { Captcha } from '../interfaces/captcha.interface';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  //apiUrl = environment.apiUrl;
  url=environment.url;
  constructor(
    private http: HttpClient
  ) { }

  getCaptcha(): Observable<Captcha> {
    return this.http.post<Captcha>(`${this.url}captchae/api/`,{});
  }

}
