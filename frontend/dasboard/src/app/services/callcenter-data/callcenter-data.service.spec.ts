import { TestBed } from '@angular/core/testing';

import { CallcenterDataService } from './callcenter-data.service';

describe('CallcenerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallcenterDataService = TestBed.get(CallcenterDataService);
    expect(service).toBeTruthy();
  });
});
