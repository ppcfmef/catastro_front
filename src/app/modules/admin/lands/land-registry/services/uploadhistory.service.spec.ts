import { TestBed } from '@angular/core/testing';

import { UploadhistoryService } from './uploadhistory.service';

describe('UploadhistoryService', () => {
  let service: UploadhistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadhistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
