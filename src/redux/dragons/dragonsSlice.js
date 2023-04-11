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
  name: FETCH_DRAGONS,
  initialState,
  extraReducers: (builder) => builder
    .addCase(
      fetchDragons.pending,
      (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }),
    )
    .addCase(
      fetchDragons.fulfilled,
      (state, { payload }) => {
        const fetchedDragons = payload.map((dragon) => {
          const {
            id, name, type, flickr_images: [image],
          } = dragon;

          return ({
            id,
            name,
            type,
            image,
          });
        });

        return ({
          ...state,
          available: fetchedDragons,
          isLoading: false,
        });
      },
    )
    .addCase(
      fetchDragons.rejected,
      (state, { payload }) => ({
        ...state,
        error: payload,
        isLoading: false,
      }),
    ),
});

/** ===================================================
 *  Export fetchDragons action
 *  =================================================== */
export { fetchDragons };

/** ===================================================
 *  Export dragons reducer as default
 *  =================================================== */
export default dragonsSlice.reducer;
