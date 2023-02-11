/* eslint-disable @ngrx/on-function-explicit-return-type */
import { Action, createReducer, on } from '@ngrx/store';
import { TrackState } from './track.state';
import * as trackActions from './track.actions';

export const initialTrackState: TrackState = {
  track: null,
  isLoading: false,
  isError: null,
};

const trackReducerInternal = createReducer(
  initialTrackState,
  on(trackActions.getTrackAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(trackActions.getTrackSuccessAction, (state, { track }) => {
    return {
      ...state,
      track: track,
      isLoading: false,
    };
  }),
  on(trackActions.getTrackErrorAction, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  })
);

export function trackReducer(state: TrackState | undefined, action: Action) {
  return trackReducerInternal(state, action);
}
