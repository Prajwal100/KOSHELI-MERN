import React, { useState, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormLabel,
  CRow,
  CInputGroup,
  CInputGroupText,
  CSpinner,
  CImage,
} from '@coreui/react'
import { cibFacebookF, cibInstagram, cibLinkedin, cibTwitter } from '@coreui/icons'
import SubmitButton from 'src/components/page/SubmitButton'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import settingsService from 'src/services/admin/settingsService'
import http from 'src/services/api'
import { UPLOAD_URL } from 'src/config'
import { validateForm } from 'src/utils/helper'
import { toast } from 'react-toastify'
import { ToastObjects } from 'src/utils/toast/toastObject'
import InputError from 'src/components/page/InputError'
const AddCategory = () => {
  const dispatch = useDispatch()

  const [siteName, setSiteName] = useState('')
  const [siteKeywords, setSiteKeywords] = useState('')
  const [siteDescription, setSiteDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [favicon, setFavicon] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [symbol, setSymbol] = useState('$')
  const [address, setAddress] = useState('')
  const [copyright, setCopyright] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')

  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingFav, setUploadingFav] = useState(false)
  const [id, setId] = useState('')

  const initialFormErrors = {
    siteName: '',
    logo: '',
    email: '',
    address: '',
    copyright: '',
  }
  const [errors, setErrors] = useState(initialFormErrors)

  const validateInputs = () => {
    const err = { ...errors }
    err.siteName = !siteName ? 'Site name is required.' : ''
    err.logo = !logo ? 'Logo field is required' : ''
    err.email = !email ? 'Email field is required' : ''
    err.address = !address ? 'Address field is required' : ''
    err.copyright = !copyright ? 'Copyright field is required' : ''
    setErrors({ ...err })
    return validateForm(err)
  }

  const settings = useSelector((state) => state.settingsReducer.settings)

  useEffect(() => {
    if (!settings || Object.keys(settings).length < 1) {
      try {
        settingsService.getSettings(dispatch)
      } catch (error) {
        console.error(error)
      }
    }
    setId(settings._id)
    setSiteName(settings.site_name)
    setSiteKeywords(settings.site_keywords)
    setSiteDescription(settings.site_description)
    setLogo(settings.logo)
    setFavicon(settings.favicon)
    setEmail(settings.email)
    setPhone(settings.phone)
    setSymbol(settings.symbol)
    setAddress(settings.address)
    setCopyright(settings.copyright)
    setFacebookUrl(settings.facebookUrl)
    setInstagramUrl(settings.instagramUrl)
    setTwitterUrl(settings.twitterUrl)
    setLinkedinUrl(settings.linkedinUrl)
  }, [dispatch, settings])

  const uploadLogo = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('logo', file)
    setUploadingLogo(true)
    try {
      let res = await http.post('/api/v1/admin/settings/logo/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res && res.status) {
        const { url } = res.data
        setLogo(url)
        setUploadingLogo(false)
      }
    } catch (e) {
      toast.error(e.message, ToastObjects)
    }
  }

  const uploadFavicon = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('favicon', file)
    setUploadingFav(true)
    try {
      let res = await http.post('/api/v1/admin/settings/favicon/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res && res.status) {
        const { url } = res.data
        setFavicon(url)
        setUploadingFav(false)
      }
    } catch (e) {
      toast.error(e.message, ToastObjects)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateInputs()) {
      try {
        let res = await settingsService.updateSettings(
          id,
          {
            site_name: siteName,
            site_keywords: siteKeywords,
            site_description: siteDescription,
            email,
            phone,
            address,
            copyright,
            logo,
            favicon,
            symbol,
            facebookUrl,
            instagramUrl,
            twitterUrl,
            linkedinUrl,
          },
          dispatch,
        )

        if (res && res.status) {
          toast.success(res.message, ToastObjects)
        }
      } catch (error) {
        toast.error(error.message, ToastObjects)
      }
    }
  }

  return (
    <div>
      <CRow className="justify-content-center">
        <CCol lg={12} sm={12}>
          <CCard>
            <CCardHeader>Update Settings</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
                <CCol md={12}>
                  <CFormLabel htmlFor="site_name">
                    Name <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="site_name"
                    placeholder="Site name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                  {errors && errors.siteName.length > 0 && (
                    <InputError>{errors.siteName}</InputError>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="meta_keywords">Meta keywords</CFormLabel>
                  <CFormTextarea
                    type="text"
                    id="meta_keywords"
                    placeholder="Meta Keywords..."
                    value={siteKeywords}
                    onChange={(e) => setSiteKeywords(e.target.value)}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="meta_description">Meta Description</CFormLabel>
                  <CFormTextarea
                    type="text"
                    id="meta_description"
                    placeholder="Meta Description..."
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="logo">
                    Company Logo <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput type="file" id="logo" onChange={uploadLogo} />
                </CCol>
                {uploadingLogo ? (
                  <CCol md={6}>
                    <CSpinner color="info" />
                  </CCol>
                ) : null}
                {logo && (
                  <CCol md={6}>
                    <CFormLabel htmlFor="logo_preview">Logo Preview :</CFormLabel>

                    <CImage
                      className="px-3 img-fluid"
                      src={UPLOAD_URL + logo}
                      alt="logo image"
                      height="150px"
                      width="150px"
                    />
                  </CCol>
                )}
                <CCol md={6}>
                  <CFormLabel htmlFor="fav">Favicon Icon</CFormLabel>
                  <CFormInput type="file" id="fav" onChange={uploadFavicon} />
                </CCol>
                {uploadingFav ? (
                  <CCol md={6}>
                    <CSpinner color="info" />
                  </CCol>
                ) : null}
                {favicon && (
                  <CCol md={6}>
                    <CFormLabel htmlFor="favicon_preview">Favicon Preview :</CFormLabel>

                    <CImage
                      className="px-3 img-fluid"
                      src={UPLOAD_URL + favicon}
                      alt="favicon image"
                      height="100px"
                      width="100px"
                    />
                  </CCol>
                )}
                <CCol md={6}>
                  <CFormLabel htmlFor="company_email">
                    Company Email <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="company_email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">Contact Number</CFormLabel>
                  <CFormInput
                    type="text"
                    id="phone"
                    placeholder="Contact number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="address">
                    Address <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="address"
                    placeholder="Address.."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="symbol">Currency Symbol</CFormLabel>
                  <CFormInput
                    type="text"
                    id="symbol"
                    value={symbol}
                    placeholder="Symbol"
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="copyright">
                    Copyright <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="copyright"
                    placeholder="Copyright text"
                    value={copyright}
                    onChange={(e) => setCopyright(e.target.value)}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="site_name">Facebook</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cibFacebookF} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="site_name"
                      placeholder="Facebook URL"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="site_name">Instagram</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cibInstagram} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="site_name"
                      placeholder="Instagram URL"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="site_name">Linkedin</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cibLinkedin} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="site_name"
                      placeholder="Linkedin URL"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="site_name">Twitter</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cibTwitter} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="site_name"
                      placeholder="Twitter URL"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>

                <CCol md={12} className="d-flex">
                  <SubmitButton>Save Settings</SubmitButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}
export default AddCategory
