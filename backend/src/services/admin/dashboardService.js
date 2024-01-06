import {
  getDashboardWidgets,
  getOrderReports,
  getUserReports,
} from 'src/store/actions/dashboardActions'
import http from '../api'

const dashboardServices = {
  getDashboardWidgets: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/admin/get-dashboard-widgets')
      dispatch(getDashboardWidgets(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  getUserReports: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/admin/get-user-reports')
      dispatch(getUserReports(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  getOrderReports: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/admin/get-order-reports')
      dispatch(getOrderReports(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

export default dashboardServices
