import { TestBed } from '@angular/core/testing';

import { TipoInvestimentoServiceService } from './tipo-investimento-service.service';

describe('TipoInvestimentoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoInvestimentoServiceService = TestBed.get(TipoInvestimentoServiceService);
    expect(service).toBeTruthy();
  });
});
