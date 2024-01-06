import {
  ADMIN_GET_SLIDERS,
  ADMIN_ADD_SLIDER,
  ADMIN_UPDATE_SLIDER,
  ADMIN_DELETE_SLIDER,
} from '../constants/sliderConstants'

export default function sliderReducer(state = { sliders: [] }, action) {
  switch (action.type) {
    case ADMIN_GET_SLIDERS:
      return {
        sliders: action.payload,
      }

    case ADMIN_ADD_SLIDER: {
      let sliders = [...state.sliders]
      sliders.unshift(action.payload)
      return {
        ...state,
        sliders: sliders,
      }
    }

    case ADMIN_UPDATE_SLIDER: {
      let sliders = [...state.sliders]
      const index = sliders.findIndex((slider) => slider._id === action.payload._id)
      sliders[index] = action.payload
      return {
        sliders: sliders,
      }
    }

    case ADMIN_DELETE_SLIDER: {
      let sliders = [...state.sliders]
      const index = sliders.findIndex((slider) => slider._id === action.payload)
      sliders.splice(index, 1)
      return {
        ...state,
        sliders: sliders,
      }
    }

    default:
      return state
  }
}
