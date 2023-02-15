import { createReducer, on, Action } from '@ngrx/store';
import * as recommendationsActions from './recommendations.actions';
import { RecommendationsState } from './recommendations.state';
import * as trackActions from '../track/track.actions';
import { Track, Tracks } from 'src/app/search/models/search.interface';
import { GenreRecommendations } from 'src/app/genres/models/genres.interface';

export const initialCategoryState: RecommendationsState = {
  recommendationsData: null,
  isLoading: false,
  isError: null,
};

const recommendationsReducerInternal = createReducer(
  initialCategoryState,
  on(
    recommendationsActions.getRecommendationsAction,
    (state): RecommendationsState => {
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    }
  ),
  on(
    recommendationsActions.getRecommendationsSuccessAction,
    (state, { data }): RecommendationsState => {
      return {
        ...state,
        recommendationsData: data,
        isLoading: false,
      };
    }
  ),
  on(
    recommendationsActions.getRecommendationsErrorAction,
    (state, { message }): RecommendationsState => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  ),
  on(
    trackActions.SaveRemoveTrackSuccessAction,
    (state, { id }): RecommendationsState => {
      const tracksUpdated = state.recommendationsData?.tracks?.map((track) => {
        const trackFixed = { ...track };
        if (track.id == id) {
          trackFixed.saved = !track.saved;
        }
        return trackFixed;
      });
      const data = { ...state.recommendationsData } as GenreRecommendations;
      if (tracksUpdated) {
        data.tracks = tracksUpdated;
      }

      return {
        ...state,
        recommendationsData: data,
        isLoading: false,
      };
    }
  )
);
export function recommendationsReducer(
  state: RecommendationsState | undefined,
  action: Action
) {
  return recommendationsReducerInternal(state, action);
}
