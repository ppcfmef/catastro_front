import { TestBed } from '@angular/core/testing';

import { UserMonitoringServiceService } from './user-monitoring-service.service';

describe('UserMonitoringServiceService', () => {
  let service: UserMonitoringServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMonitoringServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
