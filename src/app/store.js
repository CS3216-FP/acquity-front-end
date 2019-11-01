import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import storage from 'redux-persist/lib/storage';
import rootReducer from 'reducers/rootReducer';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware
});

export const persistor = persistStore(store);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('reducers/rootReducer', () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require('reducers/rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
