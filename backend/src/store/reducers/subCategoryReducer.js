import {
  ADMIN_GET_SUB_CATEGORY,
  ADMIN_GET_SUB_CATEGORY_OF_CATEGORY,
  ADMIN_ADD_SUB_CATEGORY,
  ADMIN_UPDATE_SUB_CATEGORY,
  ADMIN_DELETE_SUB_CATEGORY,
} from '../constants/subcategoryConstants'

export default function subCategoryReducer(state = { subcategories: [] }, action) {
  switch (action.type) {
    case ADMIN_GET_SUB_CATEGORY: {
      return {
        subcategories: action.payload,
      }
    }

    case ADMIN_GET_SUB_CATEGORY_OF_CATEGORY: {
      return {
        subcategories: action.payload,
      }
    }

    case ADMIN_ADD_SUB_CATEGORY: {
      let subcategories = [...state.subcategories]
      subcategories.unshift(action.payload)
      return {
        ...state,
        subcategories: subcategories,
      }
    }

    case ADMIN_UPDATE_SUB_CATEGORY: {
      let subcategories = [...state.subcategories]
      const index = subcategories.findIndex((subcategory) => subcategory._id === action.payload._id)
      subcategories[index] = action.payload
      return {
        ...state,
        subcategories: subcategories,
      }
    }

    case ADMIN_DELETE_SUB_CATEGORY: {
      let subcategories = [...state.subcategories]
      const index = subcategories.findIndex((subcategory) => subcategory._id === action.payload)
      subcategories.splice(index, 1)
      return {
        ...state,
        subcategories: subcategories,
      }
    }

    default: {
      return state
    }
  }
}
