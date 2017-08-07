import { TestBed, inject } from '@angular/core/testing';

import { PrayersService } from './prayers.service';

describe('PrayersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrayersService]
    });
  });

  it('should be created', inject([PrayersService], (service: PrayersService) => {
    expect(service).toBeTruthy();
  }));
});
