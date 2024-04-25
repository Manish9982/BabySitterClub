import { createSlice } from '@reduxjs/toolkit'
import { storeLocalValue } from '../helper/LocalStore'
import { LOCAL_STORE } from '../helper/Utils'

const initialState = {
  usertype: null,
  selectedService: null,
  isProfileCompleted: true,
  defaultAdressModalVisible: false,
  defaultAddress: null,
  isRequestActive: false,
  messages: null,
  bookingsFlag: 0,
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
    },
    setDefaultAdressModalVisible: (state, action) => {
      state.defaultAdressModalVisible = action.payload
    },
    setDefaultAdress: (state, action) => {
      state.defaultAddress = action.payload
    },
    setIsRequestActive: (state, action) => {
      state.isRequestActive = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setBookingsFlag: (state, action) => {
      state.messages = action.payload
    }
  }
})

export const { setUsertype, setSelectedServices, setIsProfileCompleted, setDefaultAdressModalVisible, setDefaultAdress, setIsRequestActive, setMessages, setBookingsFlag } = globalSlice.actions;
export default globalSlice.reducer;