import {configureStore, ThunkDispatch, AnyAction, getDefaultMiddleware} from '@reduxjs/toolkit'
import {responseErrorMessage, loginSlice, loader, books, cart, modals} from './slices'

const rootReducer = {
  responseErrorMessage: responseErrorMessage.reducer,
  login: loginSlice.reducer,
  loader: loader.reducer,
  books: books.reducer,
  cart: cart.reducer,
  modals: modals.reducer
}

export type TAppState = typeof rootReducer
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: customizedMiddleware
})

export * from './slices'