import {
  ADMIN_GET_ORDERS,
  ADMIN_UPDATE_ORDER,
  ADMIN_DELETE_ORDER,
} from '../constants/orderConstants'

export function getOrders(payload) {
  return { type: ADMIN_GET_ORDERS, payload: payload }
}

export function updateOrder(payload) {
  return { type: ADMIN_UPDATE_ORDER, payload: payload }
}

export function deleteOrder(payload) {
  return { type: ADMIN_DELETE_ORDER, payload: payload }
}
