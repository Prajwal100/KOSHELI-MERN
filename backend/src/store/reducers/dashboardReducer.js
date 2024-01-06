import {
  ADMIN_GET_WIDGETS,
  ADMIN_USER_REPORT,
  ADMIN_ORDER_REPORT,
} from '../constants/dashboardContants'

const initialState = {
  widgets: {},
  userReports: [],
  orderReports: [],
}
export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_GET_WIDGETS:
      return {
        ...state,
        widgets: action.payload,
      }

    case ADMIN_USER_REPORT:
      return {
        ...state,
        userReports: [...action.payload],
      }

    case ADMIN_ORDER_REPORT:
      return {
        ...state,
        orderReports: [...action.payload],
      }
    default: {
      return state
    }
  }
}
