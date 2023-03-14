import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListLandContainerComponent } from './list-land-container.component';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { landOwnerMock } from '../../tests/mocks/land-owner.mock';
import { landRecordMock, landRecordPaginateMock } from '../../tests/mocks/land-record.mock';


describe('ListLandContainerComponent', () => {
  let component: ListLandContainerComponent;
  let fixture: ComponentFixture<ListLandContainerComponent>;
  let fakeLandRegistryService;
  let fakeLandRegistryMapService: LandRegistryMapService;

  beforeEach(async () => {

    fakeLandRegistryService = jasmine.createSpyObj(
      'LandRegistryService', ['getLandOwner', 'getLandRegister', 'getLandList', 'setLandCreate']
    );

    fakeLandRegistryService.getLandOwner.and.returnValue(of(landOwnerMock));
    fakeLandRegistryService.getLandRegister.and.returnValue(of(landRecordMock));
    fakeLandRegistryService.getLandList.and.returnValue(of(landRecordPaginateMock));

    fakeLandRegistryMapService = jasmine.createSpyObj(
      'LandRegistryMapService', ['landIn', 'emitPrint']
    );

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ListLandContainerComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LandRegistryService, useValue: fakeLandRegistryService },
        { provide: LandRegistryMapService, useValue: fakeLandRegistryMapService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLandContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call LandRegistryService.getLandOwner', () => {
    expect(fakeLandRegistryService.getLandOwner).toHaveBeenCalledTimes(1);
  });

  it('should call LandRegistryService.getLandRegister', () => {
    expect(fakeLandRegistryService.getLandRegister).toHaveBeenCalledTimes(1);
  });

  it('onChangePage should call LandRegistryService.getLandList', () => {
    component.onChangePage({ pageSize: 10, pageIndex: 1});
    fixture.detectChanges();
    // call 2 time in ngInit and onChangePage
    expect(fakeLandRegistryService.getLandList).toHaveBeenCalledTimes(2);
  });

  it('seledRecord should call fakeLandRegistryMapService.landIn', () => {
    component.seledRecord(landRecordMock);
    fixture.detectChanges();
    expect(fakeLandRegistryMapService.landIn).toBeDefined();
  });

  it('downloadDeclaration should call fakeLandRegistryMapService.emitPrint', () => {
    component.downloadDeclaration(landRecordMock);
    fixture.detectChanges();
    expect(fakeLandRegistryMapService.emitPrint).toHaveBeenCalledTimes(1);
  });
});
