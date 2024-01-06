import { GET_PROFILE, LOGIN_USER, LOGOUT_USER, PROFILE_UPDATE } from '../constants/authConstants'

export function loginUser(payload) {
  return { type: LOGIN_USER, payload: payload }
}

export function logoutUser(payload) {
  return { type: LOGOUT_USER, payload: payload }
}

export function getProfile(payload) {
  return { type: GET_PROFILE, payload }
}

export function updateProfile(payload) {
  return { type: PROFILE_UPDATE, payload: payload }
}
