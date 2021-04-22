export interface State {
  responseErrorMessage: {isResponseErrorMessageVisible: boolean}
  login: {
    isLoggedIn: boolean
    isLoading: boolean
  },
  loader: {isLoading: boolean}
}

export interface IDefaultBook {
  count: number
  price: number
  title: string
  id: number
}

export interface IBook {
  addedCount: number
  availableCount: number
  canUserDecreaseBooksCount: boolean
  canUserIncreaseBooksCount: boolean
  currentBookTotalPrice: number
  price: number
  title: string
}