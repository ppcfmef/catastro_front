export interface LandRecord {
  cup: string;  // codigo unico patrimonial
  cpm: string;  // codigo patrimonial municipio
  ubigeo: string;
  habilitacionName: string;
  steetName: string;
  urbanMza: string;
  urbanLotNumber: number;
  roadBlockNumber: number;
  site: number;
  municipalNumber: number;
  alternateNumber: number;
  dptoNumber: number;
  indoor: number;
  block: string;
  latitude: number;
  longitude: number;
  landArea: number;
  builtArea: number;
  owner: number;
  creationDate?: string;
}
