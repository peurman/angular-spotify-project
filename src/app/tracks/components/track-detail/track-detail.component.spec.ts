import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDetailComponent } from './track-detail.component';

describe('TrackDetailComponent', () => {
  let component: TrackDetailComponent;
  let fixture: ComponentFixture<TrackDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
