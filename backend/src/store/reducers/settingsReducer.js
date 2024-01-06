import { ADMIN_GET_SETTINGS, ADMIN_UPDATE_SETTINGS } from '../constants/settingsConstants'

export default function settingsReducer(state = { settings: {} }, action) {
  switch (action.type) {
    case ADMIN_UPDATE_SETTINGS:
    case ADMIN_GET_SETTINGS: {
      return {
        settings: action.payload,
      }
    }

    default: {
      return state
    }
  }
}
