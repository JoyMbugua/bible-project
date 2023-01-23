import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { CoverResults, Cover } from '../../types';

type ErrorMessage = {
  message: string;
};

type State = {
  covers: Cover[];
  status: string;
};
export const fetchCovers = createAsyncThunk<Cover[]>('/getAll', async () => {
  const res = await axios.get<CoverResults, any>(
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/list/covers.json`
  );
  console.log({ res });

  return res.data.resources;
});

const initialState: State = {
  covers: [],
  status: '',
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
      })
      .addCase(fetchCovers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectCovers = (state: RootState) => state.covers.covers;

export default coversSlice.reducer;
