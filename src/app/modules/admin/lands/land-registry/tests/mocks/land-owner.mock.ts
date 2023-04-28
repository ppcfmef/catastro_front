import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandOwner } from '../../interfaces/land-owner.interface';

export const landOwnerMock: LandOwner = {
  id: 1,
  documentType: '01',
  dni: '46161430',
  name: 'Jose Carlos',
  paternalSurname: 'Ramirez',
  maternalSurname: 'Tello',
  descriptionOwner: '',
  phone: '',
  email: 'jcramireztello@gmail.com'
};

export const landOwnerPaginateMock: IPagination<LandOwner> = {
  count: 1,
  next: '',
  previous: '',
  results: [landOwnerMock]
};
