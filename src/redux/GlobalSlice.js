import { createSlice } from '@reduxjs/toolkit'
import { storeLocalValue } from '../helper/LocalStore'
import { LOCAL_STORE } from '../helper/Utils'

const initialState = {
  usertype: null,
  selectedService: null,
  isProfileCompleted: true
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
    setIsProfileCompleted: (state, action) => {
      state.isProfileCompleted = action.payload
    }
  }
})

export const { setUsertype, setSelectedServices, setIsProfileCompleted } = globalSlice.actions;
export default globalSlice.reducer;