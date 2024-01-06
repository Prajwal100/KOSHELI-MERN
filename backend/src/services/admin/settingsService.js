import { getSettings, updateSettings } from 'src/store/actions/settingsActions'
import http from '../api'

const settingsService = {
  getSettings: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/admin/settings')
      dispatch(getSettings(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  updateSettings: async (id, data, dispatch) => {
    try {
      let res = await http.patch(`/api/v1/admin/settings/${id}`, data)
      dispatch(updateSettings(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

export default settingsService
