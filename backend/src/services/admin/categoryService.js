import {
  addAdminCategory,
  getAdminCategories,
  updateAdminCategory,
  deleteAdminCategory,
} from 'src/store/actions/categoryActions'
import http from '../api'

let categoryService = {
  getCategories: async (dispatch) => {
    try {
      const res = await http.get('/api/v1/admin/categories')
      dispatch(getAdminCategories(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  addCategory: async (data, dispatch) => {
    try {
      const res = await http.post('/api/v1/admin/category', data)
      dispatch(addAdminCategory(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  updateCategory: async (id, data, dispatch) => {
    try {
      const res = await http.patch(`/api/v1/admin/category/${id}`, data)
      dispatch(updateAdminCategory(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  deleteCategory: async (id, dispatch) => {
    try {
      const res = await http.delete(`/api/v1/admin/category/${id}`)
      dispatch(deleteAdminCategory(id, dispatch))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },
}

export default categoryService
