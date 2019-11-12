import { TestBed } from '@angular/core/testing';

import { ExecutiveViewService } from './executive-view.service';

describe('ExecutiveViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutiveViewService = TestBed.get(ExecutiveViewService);
    expect(service).toBeTruthy();
  });
});
