import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LandOwnerService } from './land-owner.service';

describe('LandOwnerService', () => {
  let service: LandOwnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
