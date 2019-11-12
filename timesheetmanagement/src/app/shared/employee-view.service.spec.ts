import { TestBed } from '@angular/core/testing';

import { EmployeeViewService } from './employee-view.service';

describe('EmployeeViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeViewService = TestBed.get(EmployeeViewService);
    expect(service).toBeTruthy();
  });
});
