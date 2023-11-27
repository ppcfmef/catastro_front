export interface IntegratePerson {
  document: string;
  nane: string;
  paternalSurname: string;
  maternalSurname: string;
}


export interface IntegrateBusiness {
  document: string;
  businessName: string;
}


export interface IntegrateNsrtmLandOwner {
  documentType: string;
  document: string;
  nane: string;
  paternalSurname: string;
  maternalSurname: string;
  businessName: string;
}

export interface SatLandOwner {
    nrodocumento: string;
    nombre: string;
    appaterno: string;
    apmaterno: string;
  }
