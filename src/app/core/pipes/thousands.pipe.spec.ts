import { TestBed } from '@angular/core/testing';
import { ThousandsPipe } from './thousands.pipe';

describe('ThousandsPipe', () => {
  let pipe: ThousandsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThousandsPipe],
    });
    pipe = TestBed.inject(ThousandsPipe);
  });

  it('should transform a number to a string with thousands separators', () => {
    expect(pipe.transform(1000)).toBe('1.000');
    expect(pipe.transform(10000)).toBe('10.000');
    expect(pipe.transform(1000000)).toBe('1.000.000');
  });
});
