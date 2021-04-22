import {configureStore, ThunkDispatch, AnyAction} from '@reduxjs/toolkit'
import {responseErrorMessage, loginSlice, loader} from './slices'

const rootReducer = {
  responseErrorMessage: responseErrorMessage.reducer,
  login: loginSlice.reducer,
  loader: loader.reducer
}

export type TAppState = typeof rootReducer
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

export * from './slices'