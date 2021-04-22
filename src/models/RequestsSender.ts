import {axios} from 'utils'
import {Dispatch} from '@reduxjs/toolkit'
import {showResponseErrorMessage, logout} from 'store'
import ResponseDebugger from './ResponseDebugger'

class RequestsSender extends ResponseDebugger {
  private static _instance: RequestsSender

  constructor() {
    super()

    if (RequestsSender._instance) {
      return RequestsSender._instance
    }

    RequestsSender._instance = this
  }

  login = async (userName: string, dispatch: Dispatch) => {
    const formData = {
      username: userName
    }

    return await this.getResponse(
      axios.post('/signin', JSON.stringify(formData)),
      dispatch,
      showResponseErrorMessage
    )
  }

  // getAllBooks = async (dispatch: ThunkDispatch<any, any, any>) => {
  //   return await this.getResponse(axios.get('/books'), dispatch, logout)
  // }
  //
  // getCurrentBookInfo = async (bookId: number, dispatch: ThunkDispatch<any, any, any>) => {
  //   return await this.getResponse(axios.get(`/books/${bookId}`), dispatch, logout)
  // }

  // purchase = async (booksList, dispatch) => {
  //   const purchaseData = {
  //     books: booksList
  //   }
  //
  //   return await this.getResponse(axios.post('/purchase',
  //  JSON.stringify(purchaseData)), dispatch, logout)
  // }
}

export default RequestsSender