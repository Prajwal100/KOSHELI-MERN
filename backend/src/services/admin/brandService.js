import {
  addAdminBrand,
  getAdminBrands,
  updateAdminBrand,
  deleteAdminBrand,
} from 'src/store/actions/brandActions'
import http from '../api'

let brandServices = {
  getAdminBrands: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/admin/brands')
      dispatch(getAdminBrands(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  addAdminBrand: async (data, dispatch) => {
    try {
      let res = await http.post('/api/v1/admin/brand', data)
      dispatch(addAdminBrand(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  updateAdminBrand: async (id, data, dispatch) => {
    try {
      let res = await http.patch(`/api/v1/admin/brand/${id}`, data)
      dispatch(updateAdminBrand(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  deleteAdminBrand: async (id, dispatch) => {
    try {
      let res = await http.delete(`/api/v1/admin/brand/${id}`)
      dispatch(deleteAdminBrand(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },
}

export default brandServices
