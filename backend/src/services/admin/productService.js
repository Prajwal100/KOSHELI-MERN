import http from '../api'

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../store/actions/productActions'
const productServices = {
  getProducts: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/admin/products')
      dispatch(getProducts(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  addProduct: async (data, dispatch) => {
    try {
      let res = await http.post('/api/v1/admin/product', data)
      dispatch(addProduct(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  updateProduct: async (id, data, dispatch) => {
    try {
      let res = await http.patch(`/api/v1/admin/product/${id}`, data)
      dispatch(updateProduct(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  deleteProduct: async (id, dispatch) => {
    try {
      let res = await http.delete(`/api/v1/admin/product/${id}`)
      dispatch(deleteProduct(id, dispatch))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },
}

export default productServices
