import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as DatabaseReducer from '../store/reducers/database.reducer';

export interface State {
  database: DatabaseReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  database: DatabaseReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
