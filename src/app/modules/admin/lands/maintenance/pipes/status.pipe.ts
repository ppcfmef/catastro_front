import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class EstatusPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Sin Cartografía';
      case 1:
        return 'Activo';
      case 2:
        return 'Con cartografía (imagen)';
      case 3:
        return 'Inactivo';
      case 4:
        return 'Activo';
      case 5:
         return 'Activo';
      default:
        return 'Sin Estado';
    }
  }
}
