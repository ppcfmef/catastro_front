import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LandRecordService } from './land-record.service';

describe('LandRecordService', () => {
  let service: LandRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(LandRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
