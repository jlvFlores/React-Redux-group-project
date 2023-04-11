import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/** ===================================================
 *  Define action type
 *  =================================================== */
const FETCH_DRAGONS = 'dragons/fetchDragons';

/** ===================================================
 *  Define asyncThunk for dragons
 *  =================================================== */
const fetchDragons = createAsyncThunk(
  FETCH_DRAGONS,
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get('https://api.spacexdata.com/v4/dragons');
      console.log(resp);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/** ===================================================
 *  Initial state for dragons
 *  =================================================== */
const initialState = {
  available: [],
  isLoading: false,
  error: null,
};

/** ===================================================
 *  Define reducer for dragons
 *  =================================================== */
const dragonsSlice = createSlice({
  FETCH_DRAGONS,
  initialState,
  extraReducers: {},
});

/** ===================================================
 *  Export dragons reducer as default
 *  =================================================== */
const { reducer } = dragonsSlice.reducer;
export default reducer;
