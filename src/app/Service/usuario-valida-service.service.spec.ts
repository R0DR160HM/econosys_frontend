import { TestBed } from '@angular/core/testing';

import { UsuarioValidaServiceService } from './usuario-valida-service.service';

describe('UsuarioServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioValidaServiceService = TestBed.get(UsuarioValidaServiceService);
    expect(service).toBeTruthy();
  });
});
