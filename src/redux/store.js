import { configureStore } from '@reduxjs/toolkit';
import arrowSlice from './arrowSlice';
import errorSlice from './errorSlice';
import feedbackSlice from './feedbackSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    arrow: arrowSlice,
    user: userSlice,
    feedback: feedbackSlice,
    error: errorSlice,
  }
})