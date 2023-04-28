import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LandRegistryService } from './land-registry.service';
import { masterDomainMock } from '../tests/mocks/master-domain.mock';
import { landRecordMock, landRecordPaginateMock } from '../tests/mocks/land-record.mock';
import { landOwnerMock } from '../tests/mocks/land-owner.mock';

describe('LandRegistryService', () => {
  let service: LandRegistryService;
  let httpClientSpy;
  let httpClientSpyObj;

  beforeEach(() => {
    httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'post', 'patch']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        LandRegistryService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    service = TestBed.inject(LandRegistryService);
    httpClientSpy = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getMasterDomain', () => {
    httpClientSpy.get.and.returnValue(of(masterDomainMock));
    service.getMasterDomain().subscribe((result) => {
      expect(result).toEqual(masterDomainMock);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should getLandInactiveByCpu', () => {
    httpClientSpy.get.and.returnValue(of(landRecordMock));
    service.getLandInactiveByCpu(landRecordMock.cup).subscribe((result) => {
      expect(result).toEqual(landRecordMock);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should getLandList', () => {
    httpClientSpy.get.and.returnValue(of(landRecordPaginateMock));
    service.getLandList({}).subscribe((result) => {
      expect(result).toEqual(landRecordPaginateMock);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should searchOwnerbyDocument', () => {
    httpClientSpy.get.and.returnValue(of(landOwnerMock));
    service.searchOwnerbyDocument(landOwnerMock.dni).subscribe((result) => {
      expect(result).toEqual(landOwnerMock);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should getOwner', () => {
    httpClientSpy.get.and.returnValue(of(landOwnerMock));
    service.getOwner(landOwnerMock.id).subscribe((result) => {
      expect(result).toEqual(landOwnerMock);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should create Owner in saveOwner', () => {
    httpClientSpy.post.and.returnValue(of(landOwnerMock));

    const createLandOwnerMock = { ...landOwnerMock };
    createLandOwnerMock.id = undefined;

    service.saveOwner(createLandOwnerMock).subscribe((result) => {
      expect(result).toEqual(landOwnerMock);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should edit Owner in saveOwner', () => {
    httpClientSpy.patch.and.returnValue(of(landOwnerMock));

    service.saveOwner(landOwnerMock).subscribe((result) => {
      expect(result).toEqual(landOwnerMock);
    });
    expect(httpClientSpy.patch).toHaveBeenCalledTimes(1);
  });

  it('should create Land Record in saveLand', () => {
    httpClientSpy.post.and.returnValue(of(landRecordMock));

    const createLandRecordMock = { ...landRecordMock };
    createLandRecordMock.id = undefined;

    service.saveLand(createLandRecordMock).subscribe((result) => {
      expect(result).toEqual(landRecordMock);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should edit Land Record in saveLand', () => {
    httpClientSpy.patch.and.returnValue(of(landRecordMock));

    service.saveLand(landRecordMock).subscribe((result) => {
      expect(result).toEqual(landRecordMock);
    });
    expect(httpClientSpy.patch).toHaveBeenCalledTimes(1);
  });
});
