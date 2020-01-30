import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as dbReducer from '../reducers/database.reducer';


// https://ngrx.io/guide/store/selectors
// creating selectors for db access

export const selectDbState = createFeatureSelector<dbReducer.State>('dbReducer');

export const selectQuery = createSelector(
    selectDbState,
    (state: dbReducer.State) => state.query || null
);

export const selectToggle = createSelector(
    selectDbState,
    (state: dbReducer.State) => state.query || null
);
