import {
  ADMIN_GET_PRODUCTS,
  ADMIN_ADD_PRODUCT,
  ADMIN_UPDATE_PRODUCT,
  ADMIN_DELETE_PRODUCT,
} from '../constants/productConstants'

export default function productReducer(state = { products: [] }, action) {
  switch (action.type) {
    case ADMIN_GET_PRODUCTS: {
      return {
        products: action.payload,
      }
    }
    case ADMIN_ADD_PRODUCT: {
      let products = [...state.products]
      products.unshift(action.payload)
      return {
        ...state,
        products: products,
      }
    }
    case ADMIN_UPDATE_PRODUCT: {
      let products = [...state.products]
      let index = products.findIndex((product) => product._id === action.payload._id)
      products[index] = action.payload
      return {
        ...state,
        products: products,
      }
    }

    case ADMIN_DELETE_PRODUCT: {
      let products = [...state.products]
      let index = products.findIndex((product) => product._id === action.payload)
      products.splice(index, 1)
      return {
        ...state,
        products: products,
      }
    }
    default: {
      return state
    }
  }
}
