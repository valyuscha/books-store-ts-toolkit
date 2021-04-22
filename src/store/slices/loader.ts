import {createSlice} from '@reduxjs/toolkit'
import {responseErrorMessage} from './responseErrorMessage'

export const loader = createSlice({
  name: 'loader',
  initialState: {isLoading: false},
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    stopLoading: (state) => {
      state.isLoading = false
    }
  },
  extraReducers: {
    [responseErrorMessage.actions.showResponseErrorMessage.type]: (state) => {
      state.isLoading = false
    }
  }
})

export const {startLoading, stopLoading} = loader.actions