import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCardComponent } from './track-card.component';

describe('TrackCardComponent', () => {
  let component: TrackCardComponent;
  let fixture: ComponentFixture<TrackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
