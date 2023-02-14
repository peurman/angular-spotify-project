import { createReducer, on, Action } from '@ngrx/store';
import * as recommendationsActions from './recommendations.actions';
import { RecommendationsState } from './recommendations.state';

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
  )
);
export function recommendationsReducer(
  state: RecommendationsState | undefined,
  action: Action
) {
  return recommendationsReducerInternal(state, action);
}
