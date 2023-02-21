import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type langState = {
  lang: string | null;
};
const languageSlice = createSlice({
  name: 'lang',
  initialState: { lang: 'be8dc4ba39edf911-01' } as langState,
  reducers: {
    setLanguage: (
      state,
      { payload: { lang } }: PayloadAction<{ lang: string }>
    ) => {
      state.lang = lang;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

export const selectCurrentLangauge = (state: RootState) => state.languageTheme.lang;
