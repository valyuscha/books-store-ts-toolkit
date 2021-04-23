import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import {startLoading, stopLoading} from 'store'
import {getCookie, deleteCookie} from 'utils'
import {serverCommunicationMethods} from 'serverCommunication'

const token = getCookie('token')
const activeUser = localStorage.getItem('activeUser')
const activeUserParsed = activeUser ? JSON.parse(activeUser) : false

export const auth = createAsyncThunk(
  'login/auth',
  async (userName: string, {dispatch}) => {
    dispatch(startLoading())
    const response = await serverCommunicationMethods.login(userName, dispatch)
    if (response && response.data.token) {
      document.cookie = `token=${response.data.token}`

      const userData = {
        name: response.data.username,
        avatar: response.data.avatar
      }

      localStorage.setItem('activeUser', JSON.stringify(userData))
      dispatch(login())
      dispatch(stopLoading())
    }
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: !!token && !!activeUserParsed,
    isLoading: false
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      deleteCookie('token')
      localStorage.removeItem('activeUser')
      state.isLoggedIn = false
    }
  }
})

export const {login, logout} = loginSlice.actions