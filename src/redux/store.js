import { combineReducers, configureStore } from '@reduxjs/toolkit';
import rocketsReducer from './rockets/rocketsSlice';
import dragonsReducer from './dragons/dragonsSlice';

const rootReducer = combineReducers({
  rockets: rocketsReducer,
  dragons: dragonsReducer,
});

const setupStore = (
  preloadedState,
) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default setupStore;
