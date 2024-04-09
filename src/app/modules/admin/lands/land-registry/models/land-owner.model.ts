import { LandOwner, OwnerAddress } from '../interfaces/land-owner.interface';

export enum DocumentType {
  dni = '01',
  ruc = '06',
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
  ubigeo?: string;

  constructor() {
    this.documentType = DocumentType.dni;
  }

  get isBussiness(): boolean {
    return this.documentType === DocumentType.ruc;
  }

  setId(value: number): void {
    this.id = value;
  }

  setValue(value: LandOwner): void {
    console.log('setValue>>',value);
    Object.assign(this, value);
  }

  toJson(): LandOwner {
    return {
      id: this.id,
      code: this.code,
      ubigeo: this.ubigeo,
      documentType: this.documentType,
      dni: this.dni,
      name: this.name,
      paternalSurname: this.paternalSurname,
      maternalSurname: this.maternalSurname,
      descriptionOwner: this.descriptionOwner,
      phone: this.phone,
      email: this.email,
      taxAddress: this.taxAddress,
      address: this.address
    };
  }
}
