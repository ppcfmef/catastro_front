
import * as XLSX from 'xlsx';
export class ExportUtils {

    static exportToExcel(jsonData: any, nameFile: string): void {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* generate XLSX file and trigger download */
        XLSX.writeFile(wb, nameFile);
      }
}
