import { TestBed } from '@angular/core/testing';

import { ManagerViewService } from './manager-view.service';

describe('ManagerViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagerViewService = TestBed.get(ManagerViewService);
    expect(service).toBeTruthy();
  });
});
