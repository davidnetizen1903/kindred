import { createSlice } from '@reduxjs/toolkit';

/**
 * The way the app state is structured
 */
interface AppState {
  sidebarOpen: boolean;
}

/**
 * The initial values of the `App` state
 */
const initialState: AppState = {
  sidebarOpen: false,
};

/**
 * The slice which handles the state management logic
 */
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
  },
});

/**
 * The actions which are available
 */
export const { openSidebar, closeSidebar } = appSlice.actions;

/**
 * A reference to the reducer
 */
export const appReducer = appSlice.reducer;
