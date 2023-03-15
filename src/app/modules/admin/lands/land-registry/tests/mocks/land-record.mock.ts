import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandRecord } from '../../interfaces/land-record.interface';

export const landRecordMock: LandRegistryMap = {
  id: 5657,
  idLandCartographic: '737',
  idPlot: '190407031268',
  idCartographicImg: null,
  idObjectImg: null,
  cpm: null,
  secEjec: null,
  ubigeo: '040703',
  cup: '30806893-0002-10',
  codSect: '15',
  codUu: '0040',
  codMzn: '032',
  codLand: '002',
  codCuc: null,
  uuType: '26',
  habilitacionName: 'EL ARENAL',
  referenceName: null,
  urbanMza: 'G',
  urbanLotNumber: 2,
  codStreet: '0222',
  streetType: '01',
  streetName: 'INDEPENDENCIA',
  streetNameAlt: null,
  municipalNumber: null,
  block: null,
  indoor: null,
  floor: null,
  km: null,
  landmark: null,
  municipalAddress: null,
  urbanAddress: null,
  assignedAddress: null,
  longitude: -71.79954494374189,
  latitude: -17.124226847434315,
  idAranc: '1001',
  statusImg: null,
  landArea: null,
  frontLength: null,
  locationPark: null,
  groupUseDesc: null,
  numberInhabitants: null,
  classificationLandDesc: null,
  buildStatusDesc: null,
  propertyType: null,
  selfAssessmentTotal: null,
  condominium: null,
  deduction: null,
  selfAssessmentAffection: null,
  sourceInformation: 'CARTOGRAFIA MUNICIPAL',
  resolutionType: '1',
  resolutionDocument: null,
  apartmentNumber: null,
  site: null,
  inactiveReason: null,
  owner: 1,
  side: '1',
  streetBlock: '20',
  rangCup: '30806893',
  documentType: '01',
  document: '46161430',
  codOwner: '00000',
  name: 'Jose Carlos',
  paternalSurname: '',
  maternalSurname: '',
  descriptionOwner: '',
  taxAddress: '',
  status: 0,
  idLote: '',
  idImg: '',
  secuen: 0,
  departure: '',
  ranNum: ''
};


export const landRecordPaginateMock: IPagination<LandRegistryMap> = {
  count: 1,
  next: '',
  previous: '',
  results: [landRecordMock]
};


export const landRecordItemMock: LandRecord = {
  cup: '30806893-0002-10',
  cpm: '',
  idPlot: '123',
  idCartographicImg: '1234',
  ubigeo: '150101',
  habilitacionName: '',
  steetName: 'Av. Arica',
  urbanMza: '',
  urbanLotNumber: null,
  roadBlockNumber: null,
  site: null,
  municipalNumber: null,
  alternateNumber: null,
  dptoNumber: 624,
  indoor: 1501,
  block: '',
  latitude: null,
  longitude: null,
  landArea: null,
  builtArea: null,
  owner: 1,
  creationDate: '',
};
