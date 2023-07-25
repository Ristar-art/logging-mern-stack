
// store.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './components/addDetails/addDetailsSlice'


const store = configureStore({
  reducer: {
    profiles: profileReducer,

  },
});

export default store;
