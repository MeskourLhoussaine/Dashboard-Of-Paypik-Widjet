import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { marchandGuard } from './marchand.guard';

describe('marchandGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => marchandGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
