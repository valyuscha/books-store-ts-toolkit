import {AxiosResponse} from 'axios'
import {AnyAction, Dispatch} from '@reduxjs/toolkit'

class ResponseDebugger {
  getResponse = async (
    request: Promise<AxiosResponse>,
    dispatch: Dispatch,
    func: () => AnyAction
  ) => {
    try {
      return await request
    } catch (e) {
      dispatch(func())
    }
  }
}

export default ResponseDebugger