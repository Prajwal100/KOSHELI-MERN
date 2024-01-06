import {
  ADMIN_GET_BRAND,
  ADMIN_ADD_BRAND,
  ADMIN_UPDATE_BRAND,
  ADMIN_DELETE_BRAND,
} from '../constants/brandConstants'

export function getAdminBrands(payload) {
  return { type: ADMIN_GET_BRAND, payload: payload }
}

export function addAdminBrand(payload) {
  return { type: ADMIN_ADD_BRAND, payload: payload }
}

export function updateAdminBrand(payload) {
  return { type: ADMIN_UPDATE_BRAND, payload: payload }
}

export function deleteAdminBrand(payload) {
  return { type: ADMIN_DELETE_BRAND, payload: payload }
}
