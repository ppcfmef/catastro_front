import { TestBed } from '@angular/core/testing';

import { DetailTableService } from './detail-table.service';

describe('DetailTableService', () => {
  let service: DetailTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
