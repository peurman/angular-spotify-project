import { createReducer, on, Action } from '@ngrx/store';
import * as genresActions from './genres.actions';
import { GenresState } from './genres.state';

export const initialCategoryState: GenresState = {
  genresData: null,
  isLoading: false,
  isError: null,
};

const genresReducerInternal = createReducer(
  initialCategoryState,
  on(genresActions.getGenresAction, (state): GenresState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(genresActions.getGenresSuccessAction, (state, { data }): GenresState => {
    return {
      ...state,
      genresData: data,
      isLoading: false,
    };
  }),
  on(genresActions.getGenresErrorAction, (state, { message }): GenresState => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  })
);
export function genresReducer(state: GenresState | undefined, action: Action) {
  return genresReducerInternal(state, action);
}
