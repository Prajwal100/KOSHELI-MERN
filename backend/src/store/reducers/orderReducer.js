import {
  ADMIN_GET_ORDERS,
  ADMIN_UPDATE_ORDER,
  ADMIN_DELETE_ORDER,
} from '../constants/orderConstants'

export default function orderReducer(state = { orders: [] }, action) {
  switch (action.type) {
    case ADMIN_GET_ORDERS: {
      return {
        orders: action.payload,
      }
    }

    case ADMIN_UPDATE_ORDER: {
      let orders = [...state.orders]
      let index = orders.findIndex((order) => order._id === action.payload._id)
      orders[index] = action.payload
      return {
        ...state,
        orders: orders,
      }
    }

    case ADMIN_DELETE_ORDER: {
      let orders = [...state.orders]
      let index = orders.findIndex((order) => order._id === action.payload._id)
      orders.splice(index, 1)
      return {
        ...state,
        orders: orders,
      }
    }

    default: {
      return state
    }
  }
}
