import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IPagination} from '../../../../core/common/interfaces/common.interface';
import {Document} from '../interfaces/document.interface';

@Injectable()
export class DocumentCatalogService {
    private apiBase = `${environment.apiUrl}`;

    constructor(private httpClient: HttpClient) { }

    getDocuments(queryParams = null): Observable<IPagination<Document>> {
        return this.httpClient.get<IPagination<Document>>(`${this.apiBase}/documents/manuals/`, {params: queryParams});
    }

    getDocumentById(id: number): Observable<IPagination<Document>> {
        return this.httpClient.get<IPagination<Document>>(`${this.apiBase}/documents/manuals/${id}/`);
    }

    createDocument(payload: any): Observable<IPagination<Document>> {
        return this.httpClient.post<IPagination<Document>>(`${this.apiBase}/documents/manuals/`, {payload});
    }

    updateDocument(payload: any): Observable<IPagination<Document>> {
        return this.httpClient.post<IPagination<Document>>(`${this.apiBase}/documents/manuals/`, {payload});
    }
}
