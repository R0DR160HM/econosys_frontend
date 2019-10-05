import { TestBed } from '@angular/core/testing';

import { InvestimentoServiceService } from './investimento-service.service';

describe('InvestimentoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestimentoServiceService = TestBed.get(InvestimentoServiceService);
    expect(service).toBeTruthy();
  });
});
