import { TestBed } from '@angular/core/testing';

import { PostStorageService } from './post.storage.service';

describe('PostStorageService', () => {
  let service: PostStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
