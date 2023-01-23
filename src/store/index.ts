import { configureStore } from '@reduxjs/toolkit';
import { bibleApi } from './services/bible';
import coverReducer from './features/covers';

const store = configureStore({
  reducer: {
    covers: coverReducer,
    [bibleApi.reducerPath]: bibleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bibleApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
