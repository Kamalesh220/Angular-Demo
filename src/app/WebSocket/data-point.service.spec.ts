import { TestBed } from '@angular/core/testing';

import { DataPointService } from './data-point.service';

describe('DataPointService', () => {
  let service: DataPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
