import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/auth/cartSlice';
import menuReducer from '../features/auth/menuSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  menu: menuReducer,

});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], // you might want to persist other reducers as well
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore these action types for serializability checks
    },
  }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export default store;