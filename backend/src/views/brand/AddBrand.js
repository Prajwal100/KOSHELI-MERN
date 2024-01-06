import React, { useState, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
  CImage,
  CSpinner,
} from '@coreui/react'
import SubmitButton from 'src/components/page/SubmitButton'
import { useNavigate, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { validateForm } from 'src/utils/helper'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import brandServices from '../../services/admin/brandService'
import InputError from 'src/components/page/InputError'
import http from '../../services/api'
import { UPLOAD_URL } from 'src/config'
import Select from 'react-select'
const AddBrand = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brandReducer.brands)

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState({ value: 'active', label: 'active' })
  const [update, setUpdate] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const match = useMatch('/brand/:id/edit')
  const [id, setId] = useState('')
  const initialFormErrors = {
    name: '',
    image: '',
    status: '',
  }
  const [errors, setErrors] = useState(initialFormErrors)

  const validateInputs = () => {
    const err = { ...errors }
    err.name = !name ? 'Name field is required.' : ''
    err.status = !status ? 'Please choose a status.' : ''
    err.image = !image ? 'Image field is required.' : ''
    setErrors({ ...err })
    return validateForm(err)
  }

  useEffect(() => {
    if (match) {
      setId(match.params.id)
      setUpdate(true)
    }
  }, [match])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        await brandServices.getAdminBrands(dispatch)
      } catch (e) {
        console.log(e)
      }
    }
    if (update) {
      if (!brands || brands.length === 0) {
        fetchBrands()
      }

      const brand = brands.find((brand) => brand._id.toString() === id)
      if (brand) {
        setName(brand.name)
        setImage(brand.logo)
        setStatus({
          value: brand.status,
          label: brand.status,
        })
      }
    }
  }, [brands, dispatch, id, match, update])

  const uploadBrandImg = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      let res = await http.post('/api/v1/admin/brand/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res.status) {
        const { url } = res.data
        setImage(url)
      }
      setUploading(false)
    } catch (e) {
      toast.error(e.message, ToastObjects)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateInputs()) {
      setSubmitting(true)
      if (update) {
        try {
          let res = await brandServices.updateAdminBrand(
            id,
            {
              name,
              logo: image,
              status: status.value,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/brands')
          } else {
            toast.error('Something went wrong.', ToastObjects)
          }
        } catch (error) {
          toast.error(error.message, ToastObjects)
        }
      } else {
        try {
          let res = await brandServices.addAdminBrand(
            {
              name,
              logo: image,
              status: status.value,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/brands')
          } else {
            toast.error('Something went wrong.', ToastObjects)
          }
        } catch (error) {
          toast.error(error.message, ToastObjects)
        }
      }
      setSubmitting(false)
    }
  }
  return (
    <div>
      <CRow className="justify-content-center">
        <CCol lg={12} sm={12}>
          <CCard>
            <CCardHeader>{update ? 'Update' : 'Add'} Brand</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
                <CCol md={12}>
                  <CFormLabel htmlFor="name">
                    Name <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    placeholder="Brand name"
                    value={name}
                    invalid={errors.name.length > 0}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors && errors.name.length > 0 && <InputError>{errors.name}</InputError>}
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="image">
                    Logo <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    invalid={errors.image.length > 0}
                    onChange={uploadBrandImg}
                  />
                  {errors && errors.image.length > 0 && <InputError>{errors.image}</InputError>}
                </CCol>
                {uploading ? (
                  <CCol md={6}>
                    <CSpinner color="info" />
                  </CCol>
                ) : null}

                {image && (
                  <CCol md={6}>
                    <CFormLabel htmlFor="image_preview">Image Preview :</CFormLabel>

                    <CImage
                      className="px-3 img-fluid"
                      src={UPLOAD_URL + image}
                      alt="brand image"
                      height="150px"
                      width="150px"
                    />
                  </CCol>
                )}
                <CCol md={6}>
                  <CFormLabel htmlFor="status">
                    Status <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <Select
                    name="status"
                    invalid={errors.status.length > 0}
                    value={status}
                    options={['active', 'inactive'].map((item) => {
                      return {
                        value: item,
                        label: item,
                      }
                    })}
                    onChange={(option) => {
                      setStatus({
                        value: option.value,
                        label: option.value,
                      })
                    }}
                  />
                  {errors && errors.status.length > 0 && <InputError>{errors.status}</InputError>}
                </CCol>

                <CCol md={12} className="d-flex">
                  <SubmitButton>
                    {submitting ? (
                      <>
                        <CSpinner component="span" size="sm" aria-hidden="true" /> Loading...
                      </>
                    ) : (
                      `${update ? 'Update' : 'Save'} Brand`
                    )}
                  </SubmitButton>
                  <CButton
                    style={{ marginLeft: '10px' }}
                    type="button"
                    onClick={() => {
                      navigate('/brands')
                    }}
                    color="warning"
                  >
                    Back to list
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
export default AddBrand
