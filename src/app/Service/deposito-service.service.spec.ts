import { TestBed } from '@angular/core/testing';

import { DepositoServiceService } from './deposito-service.service';

describe('DepositoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepositoServiceService = TestBed.get(DepositoServiceService);
    expect(service).toBeTruthy();
  });
});
