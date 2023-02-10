import { createReducer, on, Action } from '@ngrx/store';
import * as searchAlbumsActions from './search-albums.actions';
import { SearchAlbumsState } from './search-albums.state';

export const initialSearchAlbumsState: SearchAlbumsState = {
  searchAlbumsData: null,
  isLoading: false,
  isError: null,
};

const searchAlbumsReducerInternal = createReducer(
  initialSearchAlbumsState,
  on(searchAlbumsActions.getSearchAlbumsAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(searchAlbumsActions.getSearchAlbumsSuccessAction, (state, { data }) => {
    return {
      ...state,
      searchAlbumsData: data,
      isLoading: false,
    };
  }),
  on(searchAlbumsActions.getSearchAlbumsErrorAction, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  })
);
export function searchAlbumsReducer(
  state: SearchAlbumsState | undefined,
  action: Action
) {
  return searchAlbumsReducerInternal(state, action);
}
