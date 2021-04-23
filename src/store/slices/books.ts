import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {IDefaultBook} from 'globalInterfaces'
import {startLoading, stopLoading} from 'store'
import {serverCommunicationMethods} from 'serverCommunication'

export const getAllBooks = createAsyncThunk(
  'books/getAllBooks',
  async (_, {dispatch}) => {
    dispatch(startLoading())
    const response = await serverCommunicationMethods.getAllBooks(dispatch)
    if (response && response.data) {
      dispatch(setAllBooks(response.data))
    }
    dispatch(stopLoading())
  }
)

export const getCurrentBookInfo = createAsyncThunk(
  'books/getCurrentBookInfo',
  async (bookId: string | number, {dispatch}) => {
    dispatch(startLoading())
    const response = await serverCommunicationMethods
      .getCurrentBookInfo(bookId, dispatch)

    if (response && response.data) {
      dispatch(setCurrentBookInfo(response.data))
      dispatch(stopLoading())
    }
  }
)

export const books = createSlice({
  name: 'books',
  initialState: {
    allBooks: [] as IDefaultBook[],
    currentBookInfo: {}
  },
  reducers: {
    setAllBooks: (state, {payload}: PayloadAction<IDefaultBook[]>) => {
      state.allBooks = payload
    },
    setCurrentBookInfo: (state, {payload}: PayloadAction<IDefaultBook>) => {
      state.currentBookInfo = payload
    }
  }
})

export const {setAllBooks, setCurrentBookInfo} = books.actions