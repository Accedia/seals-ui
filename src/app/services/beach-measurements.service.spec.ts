import { TestBed } from '@angular/core/testing';

import { BeachMeasurementsService } from './beach-measurements.service';

describe('BeachMeasurementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeachMeasurementsService = TestBed.get(BeachMeasurementsService);
    expect(service).toBeTruthy();
  });
});
