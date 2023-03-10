import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UploadhistoryService } from './uploadhistory.service';

describe('UploadhistoryService', () => {
  let service: UploadhistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(UploadhistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
