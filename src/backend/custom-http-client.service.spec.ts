import {CustomHttpClient} from './custom-http-client.service';
import {TestBed} from '@angular/core/testing';

describe('CustomHttpClient', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomHttpClient = TestBed.get(CustomHttpClient);
    expect(service).toBeTruthy();
  });
});
