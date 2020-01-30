import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as DatabaseReducer from '../store/reducers/database.reducer';

import * as Actions from './actions/database.actions';
import * as Selectors from './selectors/database.selectors';

export interface State {
  database: DatabaseReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  database: DatabaseReducer.reducer
};


export { Actions };
export { Selectors };


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
