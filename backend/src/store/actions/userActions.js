import { ADMIN_GET_USERS, ADMIN_UPDATE_USER, ADMIN_DELETE_USER } from '../constants/userConstants'

export function getUsers(payload) {
  return { type: ADMIN_GET_USERS, payload }
}

export function updateUser(payload) {
  return { type: ADMIN_UPDATE_USER, payload }
}

export function deleteUser(payload) {
  return { type: ADMIN_DELETE_USER, payload }
}
