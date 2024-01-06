import { deleteOrder, getOrders, updateOrder } from 'src/store/actions/orderActions'
import http from '../api'

const orderServices = {
  getOrders: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/admin/orders')
      dispatch(getOrders(res.data))
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  },

  updateOrder: async (id, data, dispatch) => {
    try {
      let res = await http.patch(`/api/v1/admin/order/${id}`, data)
      dispatch(updateOrder(res.data))
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  },

  deleteOrder: async (id, dispatch) => {
    try {
      let res = await http.delete(`/api/v1/admin/order/${id}`)
      dispatch(deleteOrder(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

export default orderServices
