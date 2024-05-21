import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { commercialGuard } from './commercial.guard';

describe('commercialGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => commercialGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
