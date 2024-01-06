import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page500 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} className="offset-3">
            <span className="clearfix">
              <h4 className="pt-3">Connect to the internet!</h4>
              <p className="text-medium-emphasis float-start">
                You are offline. Check your connection.
              </p>
            </span>
            <Link to="/home">Back to Home </Link>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page500
