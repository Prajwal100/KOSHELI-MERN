import React, { useState, useEffect } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CAlert,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import SubmitButton from 'src/components/page/SubmitButton'
import { validateForm } from 'src/utils/helper'
import InputError from 'src/components/page/InputError'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ToastObjects } from 'src/utils/toast/toastObject'
import authService from 'src/services/authService'
import http from 'src/services/api'

const ProfileSettings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialFormErrors = {
    current_password: '',
    new_password: '',
  }

  const profile = useSelector((state) => state.user.profile)
  useEffect(() => {
    if (!profile || Object.keys(profile).length < 1) {
      try {
        authService.getProfile(dispatch)
      } catch (e) {
        toast.error(e.message, ToastObjects)
      }
    }
    setEmail(profile.email)
  }, [dispatch, profile])

  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [errors, setErrors] = useState(initialFormErrors)

  const validateInputs = () => {
    const err = { ...errors }
    err.current_password = !currentPassword ? 'Current password field is required.' : ''
    err.new_password = !newPassword
      ? 'New password field is required.'
      : newPassword.length < 6
      ? 'New Password field must be at least 6 characters'
      : ''
    setErrors({ ...err })
    return validateForm(err)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateInputs()) {
      try {
        let res = await http.post('/api/v1/auth/change-password', {
          email,
          currentPassword,
          newPassword,
        })
        if (res && res.status) {
          toast.success(res.message, ToastObjects)
        }
      } catch (e) {
        toast.error(e.message, ToastObjects)
      }
    }
  }
  return (
    <div>
      <CRow className="justify-content-center">
        <CCol lg={12} sm={12}>
          <CCard>
            <CCardHeader>Change Password</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
                <CCol md={12}>
                  <CFormLabel htmlFor="name">Email Address</CFormLabel>
                  <CFormInput
                    type="email"
                    id="name"
                    value={email}
                    placeholder="Email Address"
                    readOnly="true"
                    disabled
                  />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="name">
                    Current Password <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="password"
                    id="name"
                    placeholder="******"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  {errors && errors.current_password.length > 0 && (
                    <InputError>{errors.current_password}</InputError>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="name">
                    New Password <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="password"
                    id="name"
                    placeholder="******"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {errors && errors.new_password.length > 0 && (
                    <InputError>{errors.new_password}</InputError>
                  )}
                </CCol>
                <CCol md={12}>
                  <CAlert color="danger">You can not update the password in demo version.</CAlert>
                </CCol>
                <CCol md={12} className="d-flex">
                  <CButton disabled>Save Changes</CButton>
                  {/* <SubmitButton>Save Changes</SubmitButton> */}

                  <CButton
                    style={{ marginLeft: '10px' }}
                    type="button"
                    onClick={() => {
                      navigate(-1)
                    }}
                    color="warning"
                  >
                    Go Back
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}
export default ProfileSettings
