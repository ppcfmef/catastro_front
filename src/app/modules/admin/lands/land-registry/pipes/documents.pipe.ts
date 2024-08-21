import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'documents',
  standalone: true,
})
export class DocumentsPipe implements PipeTransform {

  transform(value: string): string {
        switch (value) {
            case '01':
                return 'DNI';

            case '04':
                return 'Carnet de extranjería';

            case '06':
                return 'RUC';

            case '08':
                return 'Succesion Instestada';

            case '09':
                return 'Passaporte';

            case '10':
                    return 'Libreta Tributaría';

            default:
                return 'DNI';
        }
    }

}
