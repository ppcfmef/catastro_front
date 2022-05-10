import { TestBed } from '@angular/core/testing';

import { LandOwnerService } from './land-owner.service';

describe('LandOwnerService', () => {
  let service: LandOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
