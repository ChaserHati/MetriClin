import { TestBed } from '@angular/core/testing';

import { ApiEvaluacionService } from './api-evaluacion.service'

describe('ApiEvaluacionService', () => {
  let service: ApiEvaluacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEvaluacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
