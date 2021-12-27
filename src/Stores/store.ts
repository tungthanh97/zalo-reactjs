import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { globalReducer } from 'Stores';
import { EntityName } from 'Types';

const rootReducer = combineReducers({
  [EntityName.Global]: globalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
