import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    value: '',
  },
  reducers: {
    displayError: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { displayError } = errorSlice.actions

export default errorSlice.reducer