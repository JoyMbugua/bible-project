import { AnyAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { bibleApi } from './services/bible';

const store = configureStore({
  reducer: {
    [bibleApi.reducerPath]: bibleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bibleApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
