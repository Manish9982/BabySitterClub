import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usertype: null,
  selectedService: null
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUsertype: (state, action) => {
      state.usertype = action.payload
    },
    setSelectedServices: (state, action) => {
      state.selectedService = action.payload
    },
  }
})

export const { usertype, selectedService } = globalSlice.actions;
export default globalSlice.reducer;