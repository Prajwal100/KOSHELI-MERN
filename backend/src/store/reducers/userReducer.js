import { ADMIN_GET_USERS, ADMIN_UPDATE_USER, ADMIN_DELETE_USER } from '../constants/userConstants'

export default function usersReducer(state = { users: [] }, action) {
  switch (action.type) {
    case ADMIN_GET_USERS: {
      return {
        users: action.payload,
      }
    }

    case ADMIN_UPDATE_USER: {
      let users = [...state.users]
      let index = users.findIndex((user) => user._id === action.payload._id)
      users[index] = action.payload
      return {
        users: users,
      }
    }

    case ADMIN_DELETE_USER: {
      let users = [...state.users]
      let index = users.findIndex((user) => user._id === action.payload._id)
      users.splice(index, 1)
      return {
        users: users,
      }
    }

    default: {
      return state
    }
  }
}
