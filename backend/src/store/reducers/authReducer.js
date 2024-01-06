import { LOGIN_USER, GET_PROFILE, PROFILE_UPDATE } from '../constants/authConstants'

const initialState = {
  profile: {},
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      }

    case GET_PROFILE:
    case PROFILE_UPDATE:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      }

    default:
      return state
  }
}
