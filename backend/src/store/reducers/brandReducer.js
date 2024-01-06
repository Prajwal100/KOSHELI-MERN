import {
  ADMIN_GET_BRAND,
  ADMIN_ADD_BRAND,
  ADMIN_UPDATE_BRAND,
  ADMIN_DELETE_BRAND,
} from '../constants/brandConstants'

export default function brandReducer(state = { brands: [] }, action) {
  switch (action.type) {
    case ADMIN_GET_BRAND: {
      return {
        brands: action.payload,
      }
    }

    case ADMIN_ADD_BRAND: {
      let brands = [...state.brands]
      brands.unshift(action.payload)
      return {
        ...state,
        brands: brands,
      }
    }

    case ADMIN_UPDATE_BRAND: {
      let brands = [...state.brands]
      let index = brands.findIndex((brand) => brand._id === action.payload._id)
      brands[index] = action.payload
      return {
        ...state,
        brands: brands,
      }
    }

    case ADMIN_DELETE_BRAND: {
      let brands = [...state.brands]
      let index = brands.findIndex((brand) => brand._id === action.payload._id)
      brands.splice(index, 1)
      return { ...state, brands: brands }
    }
    default: {
      return state
    }
  }
}
