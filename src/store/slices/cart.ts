import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {getCartValue} from 'utils'
import {ICartBook, IDefaultBook} from 'globalInterfaces'
import {BookInfo, AddRemoveBookFromCartAction} from 'globalTypes'
import {startLoading, stopLoading, showPurchaseModal} from 'store'
import {serverCommunicationMethods} from 'serverCommunication'

const cartObj = getCartValue()

interface Payload {
  addedBooks: BookInfo
  totalPrice: number
  totalCount: number
}

const changeState = (state: any, payload: Payload) => {
  state.addedBooks = payload.addedBooks
  state.totalPrice = payload.totalPrice
  state.totalCount = payload.totalCount
}

export const purchase = createAsyncThunk(
  'cart/purchase',
  async (books: ICartBook[], {dispatch}) => {
    dispatch(startLoading())
    const response = await serverCommunicationMethods.purchase(books, dispatch)
    if (response) dispatch(setPurchaseMessage(response.data.message))
    dispatch(stopLoading())
    dispatch(showPurchaseModal())
  }
)

export const cart = createSlice({
  name: 'cart',
  initialState: {
    addedBooks: cartObj.addedBooks,
    totalPrice: cartObj.totalPrice,
    totalCount: cartObj.totalCount,
    purchaseMessage: ''
  },
  reducers: {
    addNewBookToCart: {
      reducer: (state, {payload}: PayloadAction<Payload>) => changeState(state, payload),
      prepare: (book: IDefaultBook, addedCount: number, currentBookTotalPrice: number) => {
        const newBooks = cartObj.addBookToCart(book, addedCount, currentBookTotalPrice)
        localStorage.setItem('addedToCartBooks', JSON.stringify(newBooks))

        return {
          payload: newBooks
        }
      }
    },
    editBooksCount: {
      reducer: (state, {payload}: PayloadAction<Payload>) => changeState(state, payload),
      prepare: (bookId: string, action: AddRemoveBookFromCartAction) => {
        const editedBooks = cartObj.editCountOfOneBookDuplicates(bookId, action)
        localStorage.setItem('addedToCartBooks', JSON.stringify(editedBooks))

        return {
          payload: editedBooks
        }
      }
    },
    removeBookFromCart: {
      reducer: (state, {payload}: PayloadAction<Payload>) => changeState(state, payload),
      prepare: (bookId: string) => {
        const filteredBooks = cartObj.removeBookFromCart(bookId)
        localStorage.setItem('addedToCartBooks', JSON.stringify(filteredBooks))

        return {
          payload: filteredBooks
        }
      }
    },
    clearCart: {
      reducer: (state, {payload}: PayloadAction<Payload>) => changeState(state, payload),
      prepare: () => {
        const clearedCart = cartObj.clearCart()
        localStorage.setItem('addedToCartBooks', JSON.stringify(clearedCart))

        return {
          payload: clearedCart
        }
      }
    },
    setPurchaseMessage: (state, {payload}: PayloadAction<string>) => {
      state.purchaseMessage = payload
    },
    clearPurchaseMessage: (state) => {
      state.purchaseMessage = ''
    }
  }
})

export const {
  addNewBookToCart,
  editBooksCount,
  removeBookFromCart,
  clearCart,
  setPurchaseMessage,
  clearPurchaseMessage
} = cart.actions