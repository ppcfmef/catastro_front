import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GisMetadataService } from './gis-metadata.service';

describe('GisMetadataService', () => {
  let service: GisMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GisMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
