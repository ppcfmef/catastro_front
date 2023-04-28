import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LandRecordService } from 'app/modules/admin/lands/land-registry/services/land-record.service';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { ShowMapPointComponent } from './show-map-point.component';
import { landRecordItemMock } from 'app/modules/admin/lands/land-registry/tests/mocks/land-record.mock';

describe('GeoLocationComponent', () => {
  let component: ShowMapPointComponent;
  let fixture: ComponentFixture<ShowMapPointComponent>;
  let fakeLandRecordService;
  let fakeCommonService;
  let fakeUserService;

  beforeEach(async () => {
    fakeLandRecordService = jasmine.createSpyObj(
      'LandRecordService', ['getLandRecordDownloadCroquis']
    );
    fakeLandRecordService.getLandRecordDownloadCroquis.and.returnValue(of(false));

    fakeCommonService = jasmine.createSpyObj(
      'CommonService', ['getDistrictResource']
    );
    fakeCommonService.getDistrictResource.and
    .returnValue(of({
      code: '150101',
      name: 'Lima',
      department: '15',
      province: '1501',
      extensions: [],
      resources: [],
  }));

    /*
    fakeUserService = jasmine.createSpyObj(
      'UserService', ['user$']
    );
    fakeUserService.user$.and
    .returnValue(of({
      id: 1,
      username: '46161430',
      ubigeo: '150101',
      role: {id: 1, name: 'Administrador'}
    }));
    */
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ShowMapPointComponent ],
      providers: [
        { provide: LandRecordService, useValue: fakeLandRecordService },
        { provide: CommonService, useValue: fakeCommonService },
        //{ provide: UserService, useValue: fakeUserService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMapPointComponent);
    component = fixture.componentInstance;
    component.landRecord = landRecordItemMock;
    component.points = [
      { latitude: -13.53063, longitude: -71.955921 },
      { latitude: -13.54, longitude: -71.955921 },
  ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
