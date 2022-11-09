import { TestBed } from '@angular/core/testing';

import { GisMetadataService } from './gis-metadata.service';

describe('GisMetadataService', () => {
  let service: GisMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GisMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
