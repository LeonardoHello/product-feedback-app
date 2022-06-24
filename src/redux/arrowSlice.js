import { createSlice } from '@reduxjs/toolkit'

export const arrowSlice = createSlice({
  name: 'arrow',
  initialState: {
    value: 'more',
  },
  reducers: {
    show: (state) => {
      state.value = 'less'
    },
    close: (state) => {
      state.value = 'more'
    },
  },
})

// Action creators are generated for each case reducer function
export const { show, close } = arrowSlice.actions

export default arrowSlice.reducer