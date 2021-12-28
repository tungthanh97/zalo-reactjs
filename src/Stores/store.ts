import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './user';
import { EntityName } from 'Types';

const rootReducer = combineReducers({
  [EntityName.User]: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
