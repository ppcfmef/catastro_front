import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormBuilder, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandCreateAndEditComponent } from './land-create-and-edit.component';
import { masterDomainMock } from '../../tests/mocks/master-domain.mock';
import { landRecordMock } from '../../tests/mocks/land-record.mock';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { CoreModule } from 'app/core/core.module';

describe('LandCreateAndEditComponent', () => {
  let component: LandCreateAndEditComponent;
  let fixture: ComponentFixture<LandCreateAndEditComponent>;
  let fakeLandRegistryService;
  let fakeCustomConfirmationService;
  let fakeLandRegistryMapService;

  beforeEach(async () => {
    fakeLandRegistryService = jasmine.createSpyObj(
      'LandRegistryService', ['getMasterDomain', 'getLandInactiveByCpu', 'saveLand']
    );
    fakeLandRegistryService.getMasterDomain.and.returnValue(of(masterDomainMock));
    fakeLandRegistryService.getLandInactiveByCpu.and.returnValue(of(landRecordMock));
    fakeLandRegistryService.saveLand.and.returnValue(of(landRecordMock));

    fakeCustomConfirmationService = jasmine.createSpyObj(
      'CustomConfirmationService', ['error', 'success']
    );

    fakeLandRegistryMapService = jasmine.createSpyObj(
      'LandRegistryMapService', ['createCpu']
    );
    fakeLandRegistryMapService.createCpu.and.returnValue(of(landRecordMock));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, FormsModule, BrowserAnimationsModule, HttpClientTestingModule,
        CoreModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatIconModule,
        MatButtonModule, MatInputModule, MatSlideToggleModule
      ],
      declarations: [ LandCreateAndEditComponent ],
      providers: [
        UntypedFormBuilder,
        { provide: CustomConfirmationService, useValue: fakeCustomConfirmationService },
        { provide: LandRegistryService, useValue: fakeLandRegistryService },
        { provide: LandRegistryMapService, useValue: fakeLandRegistryMapService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call LandRegistryService.searchLandByCPU', () => {
    component.createFormEdit();
    component.formEdit.get('cup').setValue(landRecordMock.cup);
    component.searchLandByCPU();
    fixture.detectChanges();
    expect(fakeLandRegistryService.getLandInactiveByCpu).toHaveBeenCalled();
  });

  it('Save land should save', () => {
    component.createFormEdit();
    component.formEdit.get('idPlot').setValue(null);
    component.formEdit.get('cup').setValue(landRecordMock.cup);
    fixture.detectChanges();
    component.saveLand();
    fixture.detectChanges();
    expect(fakeLandRegistryService.saveLand).toHaveBeenCalled();
  });

  it('Save land should create CPU', () => {
    component.createFormEdit();
    component.formEdit.get('idPlot').setValue('123456');
    component.formEdit.get('cup').setValue(null);
    component.saveLand();
    fixture.detectChanges();
    expect(fakeLandRegistryMapService.createCpu).toHaveBeenCalled();
  });
});
