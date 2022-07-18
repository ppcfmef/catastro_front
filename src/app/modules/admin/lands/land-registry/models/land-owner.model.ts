import { LandOwner, OwnerAddress } from '../interfaces/land-owner.interface';

export enum DocumentType {
  ruc = '06'
}

export class LandOwnerModel implements LandOwner {
  id: number;
  documentType: string;
  dni: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  descriptionOwner: string;
  phone: string;
  email: string;
  code?: string;
  taxAddress?: string;  // ToDo: resume for address
  numberLands?: number;
  address?: OwnerAddress;

  constructor() {}

  setValue(value: LandOwner): void {
    Object.assign(this, value);
  }

  get isBussiness(): boolean {
    return this.documentType === DocumentType.ruc;
  }
}
