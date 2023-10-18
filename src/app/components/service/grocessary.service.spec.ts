import { TestBed } from '@angular/core/testing';

import { GrocessaryService } from './grocessary.service';

describe('GrocessaryService', () => {
  let service: GrocessaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrocessaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
