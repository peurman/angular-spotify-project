import { TestBed } from '@angular/core/testing';
import { TimesPipe } from './times.pipe';

describe('TimesPipe', () => {
  let pipe: TimesPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimesPipe],
    });
    pipe = TestBed.inject(TimesPipe);
  });

  it('should transform the time in milliseconds to the format "mm:ss"', () => {
    expect(pipe.transform(60000)).toEqual('1:00');
    expect(pipe.transform(150000)).toEqual('2:30');
    expect(pipe.transform(12500)).toEqual('0:13');
  });
});
