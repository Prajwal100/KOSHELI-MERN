import { deleteUser, getUsers, updateUser } from 'src/store/actions/userActions'
import http from '../api'

const userServices = {
  getUsers: async (dispatch) => {
    try {
      let res = await http.get('/api/v1/admin/users')
      dispatch(getUsers(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  updateUser: async (id, data, dispatch) => {
    try {
      let res = await http.patch(`/api/v1/admin/user/${id}`, data)
      dispatch(updateUser(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  deleteUser: async (id, dispatch) => {
    try {
      let res = await http.delete(`/api/v1/admin/user/${id}`)
      dispatch(deleteUser(res.data))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

export default userServices
