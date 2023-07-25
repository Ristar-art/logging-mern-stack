// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addProfile } = profileSlice.actions;
export default profileSlice.reducer;
