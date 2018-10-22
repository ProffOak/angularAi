import { TestBed } from '@angular/core/testing';

import { MobileNetService } from './mobile-net.service';

describe('MobileNetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileNetService = TestBed.get(MobileNetService);
    expect(service).toBeTruthy();
  });
});
