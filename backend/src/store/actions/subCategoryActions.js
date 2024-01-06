import {
  ADMIN_GET_SUB_CATEGORY,
  ADMIN_GET_SUB_CATEGORY_OF_CATEGORY,
  ADMIN_ADD_SUB_CATEGORY,
  ADMIN_UPDATE_SUB_CATEGORY,
  ADMIN_DELETE_SUB_CATEGORY,
} from '../constants/subcategoryConstants'

export function getSubCategories(payload) {
  return { type: ADMIN_GET_SUB_CATEGORY, payload: payload }
}

export function getSubCategoriesOfCategory(payload) {
  return { type: ADMIN_GET_SUB_CATEGORY_OF_CATEGORY, payload: payload }
}

export function addSubCategory(payload) {
  return { type: ADMIN_ADD_SUB_CATEGORY, payload: payload }
}

export function updateSubCategory(payload) {
  return { type: ADMIN_UPDATE_SUB_CATEGORY, payload: payload }
}

export function deleteSubCategory(payload) {
  return { type: ADMIN_DELETE_SUB_CATEGORY, payload: payload }
}
