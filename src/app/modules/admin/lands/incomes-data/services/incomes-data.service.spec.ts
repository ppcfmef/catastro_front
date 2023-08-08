import { TestBed } from '@angular/core/testing';

import { IncomesDataService } from './incomes-data.service';

describe('IncomesDataService', () => {
  let service: IncomesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
