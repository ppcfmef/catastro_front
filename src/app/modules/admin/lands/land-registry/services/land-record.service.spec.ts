import { TestBed } from '@angular/core/testing';

import { LandRecordService } from './land-record.service';

describe('LandRecordService', () => {
  let service: LandRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
