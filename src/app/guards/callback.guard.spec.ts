import { TestBed } from '@angular/core/testing';

import { CallbackGuard } from './callback.guard';

describe('CallbackGuard', () => {
  let guard: CallbackGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CallbackGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
