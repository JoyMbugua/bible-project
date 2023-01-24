import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { CoverResults, Cover, FormattedCover } from '../../types';

type State = {
  covers: Cover[];
  status: string;
  final: FormattedCover;
};
export const fetchCovers = createAsyncThunk<Cover[]>('/getAll', async () => {
  const res = await axios.get<CoverResults, any>(
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/list/covers.json`
  );
  return res.data.resources;
});

const initialState: State = {
  covers: [],
  status: '',
  final: {},
};

const coversSlice = createSlice({
  name: 'covers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCovers.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCovers.fulfilled, (state, action) => {
        state.status = 'success';
        state.covers = state.covers.concat(action.payload);
        state.final = action.payload.reduce((prev, curr) => {
          const title = curr.public_id.split('/');
          return {
            ...prev,
            [title[1]]: {
              ...curr,
              imgUrl: `${process.env.REACT_APP_BASE_URL}/v${curr.version}/${curr.public_id}.${curr.format}`,
            },
          };
        }, {});
      })
      .addCase(fetchCovers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectCovers = (state: RootState) => state.covers.final;

export default coversSlice.reducer;
