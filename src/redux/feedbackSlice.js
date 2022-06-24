import { createSlice } from '@reduxjs/toolkit'

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    value: [],
  },
  reducers: {
    updatefeedback: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updatefeedback } = feedbackSlice.actions

export default feedbackSlice.reducer