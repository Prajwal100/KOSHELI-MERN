import {
  ADMIN_GET_WIDGETS,
  ADMIN_USER_REPORT,
  ADMIN_ORDER_REPORT,
} from '../constants/dashboardContants'

export function getDashboardWidgets(payload) {
  return { type: ADMIN_GET_WIDGETS, payload }
}

export function getUserReports(payload) {
  return { type: ADMIN_USER_REPORT, payload }
}

export function getOrderReports(payload) {
  return { type: ADMIN_ORDER_REPORT, payload }
}
