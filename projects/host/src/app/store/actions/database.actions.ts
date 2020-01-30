import { Action, createAction, props } from '@ngrx/store';

// https://ngrx.io/guide/store/actions
// creating actions to define manipulation of database

export enum ClassActionTypes {
    setToggle = '[Database] set Toggle',
    setQuery = '[Database] set Query'
}

export const setToggle = createAction(
    ClassActionTypes.setToggle,
    props<{ setState: boolean }>()
);

export const setQuery = createAction(
    ClassActionTypes.setQuery,
    props<{ setQuery: string }>()
);

