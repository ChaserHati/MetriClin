import { TestBed } from '@angular/core/testing';

import { ApiFichaService } from './api-ficha.service';

describe('ApiFichaService', () => {
  let service: ApiFichaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFichaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
