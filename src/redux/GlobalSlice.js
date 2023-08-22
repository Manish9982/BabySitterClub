import { createSlice } from '@reduxjs/toolkit'
import { storeLocalValue } from '../helper/LocalStore'
import { LOCAL_STORE } from '../helper/Utils'

const initialState = {
  usertype: null,
  selectedService: null
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUsertype: (state, action) => {
      storeLocalValue(LOCAL_STORE.USER_TYPE, `${action.payload}`)
      state.usertype = action.payload
    },
    setSelectedServices: (state, action) => {
      storeLocalValue(LOCAL_STORE.SELECTED_SERVICE, JSON.stringify(action.payload))
      state.selectedService = action.payload
    },
  }
})

export const { setUsertype, setSelectedServices } = globalSlice.actions;
export default globalSlice.reducer;