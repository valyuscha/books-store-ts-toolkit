import {createSlice} from '@reduxjs/toolkit'

export const responseErrorMessage = createSlice({
  name: 'responseErrorMessage',
  initialState: {isResponseErrorMessageVisible: false},
  reducers: {
    showResponseErrorMessage: (state) => {
      state.isResponseErrorMessageVisible = true
    },
    hideResponseErrorMessage: (state) => {
      state.isResponseErrorMessageVisible = false
    }
  }
})

export const {
  showResponseErrorMessage,
  hideResponseErrorMessage
} = responseErrorMessage.actions