import { Observable, of} from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { LandRecordService } from '../../services/land-record.service';
import { SearchSumaryPage } from './search-sumary.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LandRecordSummary } from '../../interfaces/land-record-summary.interface';

describe('NewSearchSumaryPage', () => {
  let component: SearchSumaryPage;
  let fixture: ComponentFixture<SearchSumaryPage>;
  let fakeLandRecordService: LandRecordService;
  const sumaryRecords = {
    totalRecords: 100,
    mappingRecords: 80,
    withoutMappingRecords: 10
  };

  beforeEach(async () => {
    // create fake service
    fakeLandRecordService = jasmine.createSpyObj(
      'LandRecordService', ['getSummary']
    );
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [ SearchSumaryPage ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LandRecordService, useValue: fakeLandRecordService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fakeLandRecordService.getSummary = (): Observable<LandRecordSummary> => of(sumaryRecords);
    fixture = TestBed.createComponent(SearchSumaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should valid sumary records', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const sumaryElements = compiled.querySelectorAll('.block-text > h5');
    expect(Number(sumaryElements[0].textContent)).toEqual(sumaryRecords.totalRecords);
    expect(Number(sumaryElements[1].textContent)).toEqual(sumaryRecords.mappingRecords);
    expect(Number(sumaryElements[2].textContent)).toEqual(sumaryRecords.withoutMappingRecords);
  });
});
