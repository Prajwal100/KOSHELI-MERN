import {
  getSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriesOfCategory,
} from 'src/store/actions/subCategoryActions'
import http from '../api'

const subCategoryService = {
  getSubCategories: async function (dispatch) {
    try {
      const res = await http.get('/api/v1/admin/subcategories')
      dispatch(getSubCategories(res.data))
      return Promise.resolve(res)
    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
  },

  getSubCategoriesOfCategory: async function (id, dispatch) {
    try {
      const res = await http.get(`/api/v1/admin/subcategories-of-category/${id}`)
      dispatch(getSubCategoriesOfCategory(res.data))
      return Promise.resolve(res)
    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
  },

  addSubCategory: async function (data, dispatch) {
    try {
      const res = await http.post('/api/v1/admin/subcategory', data)
      dispatch(addSubCategory(res.data))
      return Promise.resolve(res)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  updateSubCategory: async function (id, data, dispatch) {
    try {
      const res = await http.patch(`/api/v1/admin/subcategory/${id}`, data)
      dispatch(updateSubCategory(res.data))
      return Promise.resolve(res)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  deleteSubCategory: async function (id, dispatch) {
    try {
      const res = await http.delete(`/api/v1/admin/subcategory/${id}`)
      dispatch(deleteSubCategory(id))
      return Promise.resolve(res)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },
}

export default subCategoryService
