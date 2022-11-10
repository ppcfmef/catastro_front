import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportReportService {

  exportUrl = environment.exportUrl;

  constructor() { }

  getUrlExportReport(urlPath, queryParameters?: {[key: string]: string | number}): string {
    const exportUrl = new URL(`${this.exportUrl}${urlPath}`);
    for (const key in queryParameters) {
      if (queryParameters[key] !== undefined && queryParameters[key] !== null ) {
        exportUrl.searchParams.append(key, String(queryParameters[key]));
      }
    }
    return exportUrl.toString();
  }
}
