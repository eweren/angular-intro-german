import { StorageBackendService } from "./storage-backend.service";
import { TestBed } from "@angular/core/testing";

describe("StorageBackendService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: StorageBackendService = TestBed.get(StorageBackendService);
    expect(service).toBeTruthy();
  });
});
