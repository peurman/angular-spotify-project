import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackState } from './track.state';

const selectTrackState = createFeatureSelector<TrackState>('track');

export const selectTrack = createSelector(
  selectTrackState,
  (state: TrackState) => state.track
);
