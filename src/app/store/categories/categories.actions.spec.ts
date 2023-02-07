import * as fromActions from './categories.actions';
import { CategoriesClass } from 'src/app/home/models/categories.interface';

describe('Categories actions', () => {
  it('should create an action to retrieve the categories', () => {
    const action = fromActions.getCategoriesAction();
    expect(action.type).toEqual('[Category] Get Categories Action');
  });

  it('should create an action to indicate a successful categories retrieval', () => {
    const payload: CategoriesClass = {
      href: 'test',
      items: [
        {
          href: 'test',
          icons: [],
          id: '2',
          name: 'category1',
        },
      ],
      limit: 20,
      next: null,
      offset: 20,
      previous: null,
      total: 15,
    };
    const action = fromActions.getCategoriesSuccessAction({ data: payload });
    expect(action.type).toEqual('[Category] Get Categories Success Action');
    expect(action.data).toEqual(payload);
  });

  it('should create an action to indicate an error retrieving the categories', () => {
    const payload = 'Error message';
    const action = fromActions.getCategoriesErrorAction({ message: payload });
    expect(action.type).toEqual('[Category] Get Categories Error Action');
    expect(action.message).toEqual(payload);
  });
});
