import { MasterDomain } from '../../interfaces/master-domain.interface';

export const masterDomainMock: MasterDomain = {
  uuType: [
    {
      id: '1',
      name: 'ASENTAMIENTO HUMANO',
      description: '',
      shortName: 'AA.HH.',
    }
  ],
  codStreet: [
    {
      id: '01',
      name: 'AVENIDA',
      description: '',
      shortName: 'AV',
    }
  ],
  propertyType: [
    {
      id: 'U',
      name: 'Urbano',
      description: '',
      shortName: '',
    }
  ],
  codSide: [
    {
      id: '1',
      name: 'Izquierda',
      description: '',
      shortName: '',
    }
  ],
  resolutionType: [
    {
      id: '1',
      name: 'Partida',
      description: 'Partida',
      shortName: 'Partida',
    }
  ]
};
