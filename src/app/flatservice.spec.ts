import { TestBed } from '@angular/core/testing';

import { Flatservice } from './flatservice';

describe('Flatservice', () => {
  let service: Flatservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Flatservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
