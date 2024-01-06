import {
  ADMIN_GET_CATEGORY,
  ADMIN_ADD_CATEGORY,
  ADMIN_UPDATE_CATEGORY,
  ADMIN_DELETE_CATEGORY,
} from '../constants/categoryConstant'

export default function categoryReducer(state = { categories: [] }, action) {
  switch (action.type) {
    case ADMIN_GET_CATEGORY: {
      return {
        categories: action.payload,
      }
    }

    case ADMIN_ADD_CATEGORY: {
      let categories = [...state.categories]
      categories.unshift(action.payload)
      return {
        ...state,
        categories: categories,
      }
    }

    case ADMIN_UPDATE_CATEGORY: {
      let categories = [...state.categories]
      let index = categories.findIndex((category) => category._id === action.payload._id)
      categories[index] = action.payload
      return {
        ...state,
        categories: categories,
      }
    }

    case ADMIN_DELETE_CATEGORY: {
      let categories = [...state.categories]
      let index = categories.findIndex((category) => category._id === action.payload)
      categories.splice(index, 1)
      return {
        ...state,
        categories: categories,
      }
    }

    default: {
      return state
    }
  }
}
