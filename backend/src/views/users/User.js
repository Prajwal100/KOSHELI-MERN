import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CButton,
  CImage,
  CForm,
} from '@coreui/react'
import Select from 'react-select'
import SubmitButton from 'src/components/page/SubmitButton'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useMatch } from 'react-router-dom'
import userService from 'src/services/admin/userService'
import { getDateTime, toTitleCase } from 'src/utils/helper'
import { toast } from 'react-toastify'
import { ToastObjects } from 'src/utils/toast/toastObject'
const User = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch('/user/:id/edit')
  const users = useSelector((state) => state.userReducer.users)
  const [id, setId] = useState('')
  const [status, setStatus] = useState({ value: '', label: '' })
  const [user, setUser] = useState({})
  useEffect(() => {
    if (match) {
      setId(match.params.id)
    }
  }, [match])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await userService.getUsers(dispatch)
      } catch (e) {
        console.error(e)
      }
    }

    if (!users || users.length === 0) {
      fetchUser()
    }

    const userData = users.find((user) => user._id.toString() === id)

    if (userData) {
      setUser(userData)
      setStatus({
        value: userData.status,
        label: toTitleCase(userData.status),
      })
    }
  }, [dispatch, users, id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await userService.updateUser(
        id,
        {
          status: status.value,
        },
        dispatch,
      )
      if (res && res.status) {
        toast.success(res.message, ToastObjects)
        navigate('/users')
      }
    } catch (e) {
      toast.error(e.message, ToastObjects)
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>User Details</div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
              <CTable striped>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>Name </CTableDataCell>
                    <CTableDataCell>{user.name}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Email </CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Avatar </CTableDataCell>
                    <CTableDataCell>
                      {user && user.avatar ? <CImage src={user.avatar}></CImage> : '-'}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Joined Date</CTableDataCell>
                    <CTableDataCell>{getDateTime(user.createdAt)}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Role</CTableDataCell>
                    <CTableDataCell>{user.role}</CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell>Status</CTableDataCell>
                    <CTableDataCell>
                      <Select
                        name="status"
                        value={status}
                        options={['active', 'inactive', 'banned', 'pending'].map((item) => {
                          return {
                            value: item,
                            label: item,
                          }
                        })}
                        onChange={(option) => {
                          setStatus(option)
                        }}
                      />
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell>Action</CTableDataCell>

                    <CTableDataCell className="d-flex">
                      <SubmitButton>Update Changes</SubmitButton>
                      <CButton
                        style={{ marginLeft: '10px' }}
                        type="button"
                        onClick={() => {
                          navigate('/users')
                        }}
                        color="warning"
                      >
                        Back to list
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
