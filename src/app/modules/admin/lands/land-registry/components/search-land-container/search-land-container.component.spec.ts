import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { CoreModule } from 'app/core/core.module';

import { SearchLandContainerComponent } from './search-land-container.component';

import { LandOwnerService } from '../../services/land-owner.service';
import { LandRecordService } from '../../services/land-record.service';
import { ExportReportService } from 'app/shared/services/export-report.service';

import { landOwnerPaginateMock } from '../../tests/mocks/land-owner.mock';
import { landRecordItemPaginateMock, landRecordItemMock } from '../../tests/mocks/land-record.mock';
import { SearchLandTableComponent } from '../search-land-table/search-land-table.component';
import { SearchOwnerTableComponent } from '../search-owner-table/search-owner-table.component';
import { DetailPredioComponent } from '../detail-predio/detail-predio.component';
import { ShowMapPointComponent } from 'app/shared/maps/components/show-map-point/show-map-point.component';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';

describe('SearchLandContainerComponent', () => {
  let component: SearchLandContainerComponent;
  let fixture: ComponentFixture<SearchLandContainerComponent>;
  let fakeLandOwnerService;
  let fakeLandRecordService;
  let fakeExportReportService;

  beforeEach(async () => {
    // services
    fakeLandOwnerService = jasmine.createSpyObj(
      'LandOwnerService', ['getDetail']
    );

    fakeLandOwnerService.getDetail.and.returnValue(of(landOwnerPaginateMock));

    fakeLandRecordService = jasmine.createSpyObj(
      'LandRecordService', ['getList', 'setLandRecordDownloadCroquis']
    );

    fakeLandRecordService.getList.and.returnValue(of(landRecordItemPaginateMock));

    fakeExportReportService = jasmine.createSpyObj(
      'ExportReportService', ['getUrlExportReport']
    );

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule,
        CoreModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatButtonModule, MatInputModule,
        MatPaginatorModule, MatSortModule ],
      declarations: [
        SearchLandContainerComponent, MockComponent(SearchLandTableComponent), MockComponent(SearchOwnerTableComponent),
        MockComponent(DetailPredioComponent), MockComponent(ShowMapPointComponent) ],
      providers: [
        { provide: LandOwnerService, useValue: fakeLandOwnerService },
        { provide: LandRecordService, useValue: fakeLandRecordService },
        { provide: ExportReportService, useValue: fakeExportReportService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLandContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call LandOwnerService.getDetail when click show Land Map ', () => {
    const searchLandTableComponent = fixture.debugElement.query(By.directive(SearchLandTableComponent));
    searchLandTableComponent.triggerEventHandler('showLandMap', { landRecordItemMock });
    fixture.detectChanges();
    expect(fakeLandOwnerService.getDetail).toHaveBeenCalled();
  });

  it('should call LandRecordService.getList when status is empty ', () => {
    component.formFilters.get('status').setValue(undefined);
    component.onFilterStatus();
    fixture.detectChanges();
    expect(fakeLandRecordService.getList).toHaveBeenCalled();
  });

  it('should call LandRecordService.getList when status is not empty ', () => {
    component.formFilters.get('status').setValue('1');
    component.formFilters.get('search').setValue('busqueda demo');
    component.onFilterStatus();
    fixture.detectChanges();
    expect(fakeLandRecordService.getList).toHaveBeenCalled();
  });
});
