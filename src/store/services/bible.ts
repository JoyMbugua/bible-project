import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import verseOfTheDay from './verses';

export const bibleApi = createApi({
  reducerPath: 'bibleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.scripture.api.bible/v1',
    prepareHeaders: (headers) => {
      headers.set('api-key', process.env.REACT_APP_API_KEY || ' ');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBibles: builder.query({ query: () => `/bibles` }),
    getDailyVerse: builder.query<any, void>({
      query: () =>
        `/bibles/${process.env.REACT_APP_BIBLE_ID}/search?query=${verseOfTheDay}`,
    }),
    getBooks: builder.query<any, void>({
      query: () => `/bibles/${process.env.REACT_APP_BIBLE_ID}/books`,
    }),
    getChapters: builder.query({
      query: (bookId) =>
        `/bibles/${process.env.REACT_APP_BIBLE_ID}/books/${bookId}/chapters`,
    }),
  }),
});

export const {
  useGetBiblesQuery,
  useGetDailyVerseQuery,
  useGetBooksQuery,
  useGetChaptersQuery,
} = bibleApi;
