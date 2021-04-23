import {BookInfo} from './globalTypes'

export interface State {
  responseErrorMessage: {isResponseErrorMessageVisible: boolean}
  login: {
    isLoggedIn: boolean
    isLoading: boolean
  },
  loader: {isLoading: boolean},
  books: {
    allBooks: IDefaultBook[],
    currentBookInfo: IDefaultBook
  },
  modals: {
    isConfirmLogoutModalVisible: boolean,
    isConfirmClearCartModalVisible: boolean,
    isAddedBookToCartModalVisible: boolean,
    isPurchaseModalVisible: boolean
  },
  cart: {
    addedBooks: BookInfo
    totalPrice: number
    totalCount: number
    purchaseMessage: string
  }
}

export interface IDefaultBook {
  id: string
  count: number
  price: number
  title: string
  author: string
  level: string
  description: string
  cover: string
  tags: string[]
}

export interface ICartBook {
  id: string
  addedCount: number
  availableCount: number
  canUserDecreaseBooksCount: boolean
  canUserIncreaseBooksCount: boolean
  currentBookTotalPrice: number
  price: number
  title: string
}