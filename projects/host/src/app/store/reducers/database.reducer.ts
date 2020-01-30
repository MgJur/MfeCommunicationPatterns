import { Action, createReducer, on } from '@ngrx/store';
import * as DtActions from '../actions/database.actions';
import { Database } from '../interfaces/database.interface';

// https://ngrx.io/guide/store/reducers
// creating reducer to manage output of actions

export interface State {
    toggleState: boolean;
    query: string;
}
export const initialState: Database = {
    toggleState: false,
    query: ''
};

const dbReducer = createReducer(
    initialState,
    on(DtActions.setQuery, (state, { setQuery }) => ({ ...state, query: setQuery })),
    on(DtActions.setToggle, (state, { setState } ) => ({ ...state, toggleState: setState }))
  );

export function reducer(state: State | undefined, action: Action) {
    return dbReducer(state, action);
}
