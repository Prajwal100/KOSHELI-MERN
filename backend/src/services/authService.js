import http from './api'

import { loginUser, logoutUser, updateProfile } from '../store/actions/authActions'
import { getProfile } from 'src/store/actions/authActions'

let authService = {
  login: async (data, dispatch) => {
    try {
      let res = await http.post('/api/v1/auth/login', data)
      if (res.accessToken) {
        localStorage.setItem('access_token', res.accessToken)
      }
      dispatch(loginUser(res.user))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  logout: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/logout')
      if (res && res.status) {
        localStorage.removeItem('access_token')
        dispatch(logoutUser())
        return Promise.resolve(res)
      }
    } catch (error) {
      localStorage.removeItem('access_token')
      dispatch(logoutUser())
      return Promise.reject(error)
    }
  },

  getProfile: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/auth/profile')
      dispatch(getProfile(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  updateProfile: async (id, data, dispatch) => {
    try {
      let res = await http.patch(`/api/v1/auth/profile/${id}`, data)
      dispatch(updateProfile(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

export default authService
