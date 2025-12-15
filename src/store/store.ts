import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

// @ts-expect-error error
import storage from 'redux-persist/lib/storage';
// @ts-expect-error error
import persisteReducer from 'redux-persist/es/persistReducer';
// @ts-expect-error error
import persistStore from 'redux-persist/es/persistStore';

import rootReducer from './root-reduces';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer'],
};

const persistedRootReducer: typeof rootReducer = persisteReducer(
  persistConfig,
  rootReducer,
);

export const store = createStore(
  persistedRootReducer,
  undefined,
  applyMiddleware(thunk, logger),
);
export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
