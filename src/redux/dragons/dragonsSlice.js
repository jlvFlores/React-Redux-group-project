import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/** ===================================================
 *  Define action type
 *  =================================================== */
const FETCH_DRAGONS = 'dragons/fetchDragons';
const RESERVE_DRAGON = 'dragons/reserveDragon';
const CANCEL_RESERVED_DRAGON = 'dragons/cancelReservedDragon';

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
 *  Helper to check if a dragon exists
 *  =================================================== */
const dragonExists = (dragonId, thunkAPI) => new Promise((resolve, reject) => {
  const { dragons: { available: availableDragons } } = thunkAPI.getState();
  const [foundDragon] = availableDragons.filter((dragon) => dragon.id === dragonId);

  setTimeout(() => (foundDragon
    ? resolve({ data: { id: dragonId } })
    : reject(new Error(`The Dragon with id: '${dragonId}' was not found`))), 2500);
});

/** ===================================================
 *  asyncThunk to reserve a Dragon
 *  =================================================== */
const reserveDragon = createAsyncThunk(
  RESERVE_DRAGON,
  async (dragonId, thunkAPI) => {
    try {
      const resp = await dragonExists(dragonId, thunkAPI);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/** ===================================================
*  asyncThunk to cancel a reserve for a Dragon
*  =================================================== */
const cancelReservedDragon = createAsyncThunk(
  CANCEL_RESERVED_DRAGON,
  async (dragonId, thunkAPI) => {
    try {
      const resp = await dragonExists(dragonId, thunkAPI);
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
  status: { type: 'idle' },
  error: null,
};

/** ===================================================
 *  Define reducer for dragons
 *  =================================================== */
const dragonsSlice = createSlice({
  name: 'dragons',
  initialState,
  extraReducers: (builder) => builder
    .addCase(
      fetchDragons.pending,
      (state) => ({
        ...state,
        status: { type: 'loading' },
        error: null,
      }),
    )
    .addCase(
      fetchDragons.fulfilled,
      (state, { payload }) => {
        const fetchedDragons = payload.map((dragon) => {
          const {
            id, name, description, flickr_images: [image],
          } = dragon;

          return ({
            id,
            name,
            description,
            image,
          });
        });

        return ({
          ...state,
          available: fetchedDragons,
          status: { type: 'idle' },
        });
      },
    )
    .addCase(
      fetchDragons.rejected,
      (state, { payload }) => ({
        ...state,
        status: { type: 'idle' },
        error: payload,
      }),
    )
    .addCase(
      reserveDragon.pending,
      (state, { meta: { arg } }) => ({
        ...state,
        status: { type: 'booking', id: arg },
        error: null,
      }),
    )
    .addCase(
      reserveDragon.fulfilled,
      (state, { payload: { id } }) => {
        const newDragons = state.available.map(
          (dragon) => (dragon.id !== id
            ? dragon
            : ({
              ...dragon,
              reserved: true,
            })),
        );

        return ({
          ...state,
          status: { type: 'idle' },
          available: newDragons,
        });
      },
    )
    .addCase(
      reserveDragon.rejected,
      (state, { payload }) => ({
        ...state,
        status: { type: 'idle' },
        error: payload,
      }),
    )
    .addCase(
      cancelReservedDragon.pending,
      (state, { meta: { arg } }) => ({
        ...state,
        status: { type: 'canceling', id: arg },
        error: null,
      }),
    )
    .addCase(
      cancelReservedDragon.fulfilled,
      (state, { payload: { id } }) => {
        const newDragons = state.available.map(
          (dragon) => (dragon.id !== id
            ? dragon
            : ({
              ...dragon,
              reserved: false,
            })),
        );

        return ({
          ...state,
          status: { type: 'idle' },
          available: newDragons,
        });
      },
    )
    .addCase(
      cancelReservedDragon.rejected,
      (state, { payload }) => ({
        ...state,
        status: { type: 'idle' },
        error: payload,
      }),
    ),
});

/** ===================================================
 *  Export Selectors for dragons
 *  =================================================== */
export const selectAllDragonsIds = (store) => (
  store.dragons.available
    .map((dragon) => (dragon.id))
);
export const selectDragonById = (store, dragonId) => (
  store.dragons.available
    .filter((dragon) => dragon.id === dragonId)
);
export const selectIsIdle = ({ dragons: { status: { type } } }) => (type === 'idle');
export const selectIsLoading = ({ dragons: { status: { type } } }) => (type === 'loading');
export const selectIsBooking = ({ dragons: { status: { type, id } } }, dragonId) => (
  type === 'booking' && id === dragonId
);
export const selectIsCanceling = ({ dragons: { status: { type, id } } }, dragonId) => (
  type === 'canceling' && id === dragonId
);
export const selectError = ({ dragons: { error } }) => (error);

/** ===================================================
 *  Export fetchDragons action
 *  =================================================== */
export { fetchDragons, reserveDragon, cancelReservedDragon };

/** ===================================================
 *  Export dragons reducer as default
 *  =================================================== */
export default dragonsSlice.reducer;
