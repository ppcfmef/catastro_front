export interface OwnerAddress {
  ubigeo: string;
  uuType: string;
  codUu: string;
  habilitacionName: string;
  codStreet: string;
  streetType: string;
  streetName: string;
  urbanMza: string;
  urbanLotNumber: string;
  block: string;
  indoor: string;
  floor: string;
  km: string;
}

export interface LandOwner {
  id: number;
  ubigeo?: string;
  code?: string;
  documentType: string;
  dni: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  descriptionOwner: string;
  phone: string;
  email: string;
  taxAddress?: string;  // ToDo: resume for address
  numberLands?: number;
  address?: OwnerAddress;
  creationDate?: string;
  lands?: any[];
}
