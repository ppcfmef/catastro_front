import { TestBed } from '@angular/core/testing';

import { NavigationAuthorizationGuard } from './navigation-authorization.guard';

describe('NavigationAuthorizationGuard', () => {
  let guard: NavigationAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NavigationAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
