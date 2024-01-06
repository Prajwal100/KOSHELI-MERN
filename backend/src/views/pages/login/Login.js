import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ToastObjects } from 'src/utils/toast/toastObject'
import { emailIsValid } from 'src/utils/helper'
import authService from 'src/services/authService'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCopy, cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = state

    if (!email) {
      toast.error('Email is required.', ToastObjects)
      return
    }
    if (!password) {
      toast.error('Password is required.', ToastObjects)
      return
    }

    if (!emailIsValid(email)) {
      toast.error('Please enter valid email address.', ToastObjects)
      return
    }

    if (password && password.length < 6) {
      toast.error('Password must have at least 6 characters.', ToastObjects)
      return
    }

    setSubmitting(true)

    try {
      let res = await authService.login({ ...state, panel: 'admin' }, dispatch)
      if (res && res.status) {
        // navigate('/home', { replace: true })
        window.location.href = '/'

        toast.success(res.message, ToastObjects)
        setSubmitting(false)
      }
    } catch (error) {
      toast.error(error.message || 'Login error, Please try again.', ToastObjects)
      setSubmitting(false)
    }
  }

  const copyCredentials = () => {
    setState({
      email: 'admin@gmail.com',
      password: '111111',
    })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={state.email}
                        onChange={handleChange}
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={handleSubmit} color="primary" className="px-4">
                          {submitting ? <CSpinner size="sm" color="white" /> : 'Login'}
                        </CButton>
                      </CCol>
                    </CRow>
                    <hr></hr>
                    <CRow className="border pt-3">
                      <CCol xs={9}>
                        <p className="text-muted">
                          Email : admin@gmail.com <br />
                          Password : 111111
                        </p>
                      </CCol>
                      <CCol xs={3}>
                        <CButton title="copy" onClick={copyCredentials} color="info">
                          <CIcon icon={cilCopy} />
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
