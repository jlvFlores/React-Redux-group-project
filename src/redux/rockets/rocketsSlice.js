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
    reserveRocket: (state, action) => {
      const newState = state.rockets.map((rocket) => {
        if (rocket.id !== action.payload) return rocket;
        if (rocket.reserved === true) return { ...rocket, reserved: false };
        return { ...rocket, reserved: true };
      });
      return { ...state, rockets: newState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRocketsRequest.pending, (state) => ({
        ...state, isLoading: true,
      }))
      .addCase(getRocketsRequest.fulfilled, (state, action) => {
        const newState = action.payload.map((rocket) => ({ ...rocket, reserved: false }));
        return ({
          ...state,
          rockets: newState,
          isLoading: false,
        });
      })
      .addCase(getRocketsRequest.rejected, (state, action) => ({
        ...state,
        error: action.error.message,
        isLoading: false,
      }));
  },
});

export const { reserveRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;
