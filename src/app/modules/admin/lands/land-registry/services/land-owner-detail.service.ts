import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LandOwnerDetail } from '../interfaces/land-owner-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class LandOwnerDetailService {

    apiUrl = environment.apiUrl;

    http = inject(HttpClient);

  constructor() { }

  getDetailLandByOwner( landId: number, landOwnerId: number ): Observable<LandOwnerDetail> {
    return this.http.get<LandOwnerDetail>(`${this.apiUrl}/lands/land-owner-detail/detalle/${landId}/${landOwnerId}`);
  }
}
