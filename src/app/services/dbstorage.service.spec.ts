import { TestBed } from '@angular/core/testing';

import { DbstorageService } from './dbstorage.service';

describe('DbstorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbstorageService = TestBed.get(DbstorageService);
    expect(service).toBeTruthy();
  });
});
