import {
  ADMIN_GET_PRODUCTS,
  ADMIN_ADD_PRODUCT,
  ADMIN_UPDATE_PRODUCT,
  ADMIN_DELETE_PRODUCT,
} from '../constants/productConstants'

export function getProducts(payload) {
  return { type: ADMIN_GET_PRODUCTS, payload }
}

export function addProduct(payload) {
  return { type: ADMIN_ADD_PRODUCT, payload }
}

export function updateProduct(payload) {
  return { type: ADMIN_UPDATE_PRODUCT, payload }
}
export function deleteProduct(payload) {
  return { type: ADMIN_DELETE_PRODUCT, payload }
}
