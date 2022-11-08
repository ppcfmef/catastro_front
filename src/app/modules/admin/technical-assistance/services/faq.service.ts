import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IPagination} from '../../../../core/common/interfaces/common.interface';
import {Document} from '../interfaces/document.interface';

@Injectable()
export class FaqService {
    private apiBase = `${environment.apiUrl}`;

    constructor(private httpClient: HttpClient) { }

    getAll(queryParams = null): Observable<IPagination<Document>> {
        return this.httpClient.get<IPagination<Document>>(`${this.apiBase}/documents/faq/`, {params: queryParams});
    }
}
