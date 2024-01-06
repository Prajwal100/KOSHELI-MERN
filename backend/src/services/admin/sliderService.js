import {
  getAdminSliders,
  deleteAdminSlider,
  updateAdminSlider,
  addAdminSlider,
} from 'src/store/actions/sliderActions'
import http from '../api'
let sliderService = {
  getSliders: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/admin/sliders')
      dispatch(getAdminSliders(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  addSlider: async (data, dispatch) => {
    try {
      let res = await http.post('/api/v1/admin/slider', data)
      dispatch(addAdminSlider(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  updateSlider: async (id, data, dispatch) => {
    try {
      let res = await http.patch(`/api/v1/admin/slider/${id}`, data)
      dispatch(updateAdminSlider(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  deleteSlider: async (id, dispatch) => {
    try {
      let res = await http.delete(`/api/v1/admin/slider/${id}`)
      dispatch(deleteAdminSlider(id, dispatch))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

export default sliderService
