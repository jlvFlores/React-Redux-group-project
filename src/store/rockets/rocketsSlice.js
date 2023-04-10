import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rockets: [],
  isLoading: true,
  error: null,
};

export const getRocketsRequest = createAsyncThunk('rockets/getRocketsRequest', async () => {
  try {
    const resp = await axios.get('https://api.spacexdata.com/v3/rockets');
    return resp.data;
  } catch (error) {
    return error.message;
  }
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(getRocketsRequest.pending, (state) => ({
        ...state, isLoading: true,
      }))
      .addCase(getRocketsRequest.fulfilled, (state, action) => ({
        ...state,
        rockets: action.payload,
        isLoading: false,
      }))
      .addCase(getRocketsRequest.rejected, (state, action) => ({
        ...state,
        error: action.error.message,
        isLoading: false,
      }));
  },
});

export default rocketsSlice.reducer;
