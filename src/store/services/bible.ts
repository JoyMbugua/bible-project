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
    getDailyVerse: builder.query({
      query: (bibleId) =>
        `/bibles/${bibleId}/search?query=${verseOfTheDay}`,
    }),
    getBooks: builder.query({
      query: (bibleId) => `/bibles/${bibleId}/books`,
      keepUnusedDataFor: Infinity
    }),
    getChapters: builder.query({
      query: ({bookId, bibleId}) =>
        `/bibles/${bibleId}/books/${bookId}/chapters`,
    }),
    getChapterContent: builder.query({ query: ({chapterId, bibleId}) => `/bibles/${bibleId}/chapters/${chapterId}`})
  }),
});

export const {
  useGetBiblesQuery,
  useGetDailyVerseQuery,
  useGetBooksQuery,
  useGetChaptersQuery,
  useGetChapterContentQuery,
  useLazyGetChapterContentQuery
} = bibleApi;
