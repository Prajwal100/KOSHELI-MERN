import {
  ADMIN_GET_CATEGORY,
  ADMIN_ADD_CATEGORY,
  ADMIN_UPDATE_CATEGORY,
  ADMIN_DELETE_CATEGORY,
} from '../constants/categoryConstant'

// ======================== ADMIN SLIDERS ACTION ===============================

export function getAdminCategories(payload) {
  return { type: ADMIN_GET_CATEGORY, payload }
}

export function addAdminCategory(payload) {
  return { type: ADMIN_ADD_CATEGORY, payload }
}

export function updateAdminCategory(payload) {
  return { type: ADMIN_UPDATE_CATEGORY, payload }
}

export function deleteAdminCategory(payload) {
  return { type: ADMIN_DELETE_CATEGORY, payload }
}
