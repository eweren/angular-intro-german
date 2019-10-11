import { TestBed } from '@angular/core/testing';

import { StorageBackendServiceService } from './storage-backend.service';

describe('StorageBackendServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageBackendServiceService = TestBed.get(StorageBackendServiceService);
    expect(service).toBeTruthy();
  });
});
