import { MatPaginatorIntl } from '@angular/material/paginator';
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();

    this.nextPageLabel = 'Siguiente';
    this.previousPageLabel = 'Anterior';
    this.itemsPerPageLabel = 'Items por página';
    this.lastPageLabel = 'Última página';
    this.firstPageLabel = 'Primera página';
    this.getRangeLabel = (page,pageSize, length): string => {
      if (length === 0 || pageSize === 0) { return `0 de ${length}`; }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    };
  }
};
