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
  CImage,
  CTable,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import SubmitButton from 'src/components/page/SubmitButton'
import { validateForm } from 'src/utils/helper'
import InputError from 'src/components/page/InputError'
import userDefaultImg from 'src/assets/images/avatars/user.png'
import { Badge } from 'react-bootstrap'
import authService from 'src/services/authService'
import { toast } from 'react-toastify'
import { ToastObjects } from 'src/utils/toast/toastObject'
import { useDispatch, useSelector } from 'react-redux'
const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.user.profile)
  useEffect(() => {
    if (!profile || Object.keys(profile).length < 1) {
      try {
        authService.getProfile(dispatch)
      } catch (e) {
        toast.error(e, ToastObjects)
      }
    }
    setId(profile._id)
    setName(profile.name)
    setEmail(profile.email)
    setPhone(profile.phone)
    setAddress(profile.address)
    setRole(profile.role)
    setStatus(profile.status)
  }, [dispatch, profile])
  const initialFormErrors = {
    name: '',
  }
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState(initialFormErrors)

  const validateInputs = () => {
    const err = { ...errors }
    err.name = !name ? 'Name field is required.' : ''

    setErrors({ ...err })
    return validateForm(err)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateInputs()) {
      try {
        let res = await authService.updateProfile(id, { name, phone, address }, dispatch)
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
        <CCol lg={4}>
          <CCard>
            <CCardBody className="">
              <div className="text-center pb-4">
                <CImage src={userDefaultImg} width="100" />
              </div>
              <CRow>
                <CCol md={5}>Full Name :</CCol>
                <CCol md={7}>{name}</CCol>
              </CRow>
              <CRow>
                <CCol md={5}>Email :</CCol>
                <CCol md={7}>{email}</CCol>
              </CRow>
              <CRow>
                <CCol md={5}>Phone :</CCol>
                <CCol md={7}>{phone ?? '-'}</CCol>
              </CRow>
              <CRow>
                <CCol md={5}>Role :</CCol>
                <CCol md={7}>{role}</CCol>
              </CRow>
              <CRow>
                <CCol md={5}>Status :</CCol>
                <CCol md={7}>
                  <Badge bg="success">{status}</Badge>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={8}>
          <CCard>
            <CCardHeader>Update Account</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
                <CCol md={6}>
                  <CFormLabel htmlFor="name">
                    Full name <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors && errors.name.length > 0 && <InputError>{errors.name}</InputError>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Email Address</CFormLabel>
                  <CFormInput
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    value={email}
                    readOnly
                    disabled
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">Phone</CFormLabel>
                  <CFormInput
                    type="text"
                    id="phone"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="address">Address</CFormLabel>
                  <CFormInput
                    type="text"
                    id="address"
                    placeholder="Enter Address."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </CCol>
                <CCol md={12} className="d-flex">
                  <SubmitButton>Save Changes</SubmitButton>
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
export default Profile
