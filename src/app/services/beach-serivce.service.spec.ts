import { TestBed } from '@angular/core/testing';

import { BeachSerivceService } from './beach-serivce.service';

describe('BeachSerivceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeachSerivceService = TestBed.get(BeachSerivceService);
    expect(service).toBeTruthy();
  });
});
