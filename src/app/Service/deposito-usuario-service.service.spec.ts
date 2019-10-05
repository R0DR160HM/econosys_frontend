import { TestBed } from '@angular/core/testing';

import { DepositoUsuarioServiceService } from './deposito-usuario-service.service';

describe('DepositoUsuarioServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepositoUsuarioServiceService = TestBed.get(DepositoUsuarioServiceService);
    expect(service).toBeTruthy();
  });
});
