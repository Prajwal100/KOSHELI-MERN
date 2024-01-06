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
  CButton,
  CImage,
  CSpinner,
} from '@coreui/react'
import { validateForm } from '../../utils/helper'
import SubmitButton from 'src/components/page/SubmitButton'
import { useNavigate, useMatch } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import categoryService from '../../services/admin/categoryService'
import InputError from 'src/components/page/InputError'
import http from 'src/services/api'
import { UPLOAD_URL } from 'src/config'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
const AddCategory = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState({ value: 'active', label: 'active' })
  const [submitting, setSubmitting] = useState(false)
  const [update, setUpdate] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [id, setId] = useState('')
  const categories = useSelector((state) => state.categoryReducer.categories)
  const match = useMatch('/category/:id/edit')
  const initialFormErrors = {
    name: '',
    description: '',
    status: '',
  }
  const [errors, setErrors] = useState(initialFormErrors)
  const validateInputs = () => {
    const err = { ...errors }

    err.name = !name ? 'Name field is required' : ''
    err.description = description
      ? description.length < 2
        ? 'Description must be at least 2 characters.'
        : description.length > 100
        ? 'Description must be maximum of 100 characters.'
        : ''
      : ''
    err.status = !status ? 'Please choose a status.' : ''

    setErrors({ ...err })
    return validateForm(err)
  }

  useEffect(() => {
    if (match) {
      setUpdate(true)
      setId(match.params.id)
    }
  }, [match])

  useEffect(() => {
    async function fetchCategory() {
      try {
        await categoryService.getCategories(dispatch)
      } catch (error) {
        console.error(error)
      }
    }

    if (update) {
      if (!categories || categories.length === 0) {
        fetchCategory()
      }
      const category = categories.find((category) => category._id.toString() === id)

      if (category) {
        setName(category.name)
        setDescription(category.description)
        setImage(category.image)
        setStatus({
          value: category.status,
          label: category.status,
        })
      }
    }
  }, [dispatch, categories, update, id])

  const uploadCategoryImage = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)
      let res = await http.post('/api/v1/admin/category/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res.status) {
        const { url } = res.data
        setImage(url)
      }
      setUploading(false)
    } catch (e) {
      console.error(e)
      toast.error(e.message, ToastObjects)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateInputs()) {
      setSubmitting(true)

      if (update) {
        try {
          let res = await categoryService.updateCategory(
            id,
            {
              name,
              description,
              image,
              status: status.value,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/categories')
          }
        } catch (error) {
          console.error(error)
          toast.error(error.message, ToastObjects)
        }
      } else {
        try {
          let res = await categoryService.addCategory(
            {
              name,
              description,
              image,
              status: status.value,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/categories')
          }
        } catch (error) {
          console.error(error)
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
            <CCardHeader>{update ? 'Update Category' : 'Add Category'}</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
                <CCol md={12}>
                  <CFormLabel htmlFor="name">
                    Name <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category name"
                    invalid={errors.name.length > 0}
                  />
                  {errors && errors.name.length > 0 && <InputError>{errors.name}</InputError>}
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description..."
                    invalid={errors.description.length > 0}
                  />
                  {errors.description.length > 0 && <InputError>{errors.description}</InputError>}
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="image">Category Image</CFormLabel>
                  <CFormInput type="file" onChange={uploadCategoryImage} />
                </CCol>
                {uploading ? (
                  <CCol md={6}>
                    <CSpinner color="info" />
                  </CCol>
                ) : null}

                {image ? (
                  <>
                    <CCol md={6}>
                      <CFormLabel htmlFor="image_preview">Image Preview</CFormLabel>
                      <CImage
                        className="px-3 img-fluid"
                        src={UPLOAD_URL + image}
                        alt="category image"
                        height="150px"
                        width="150px"
                      />
                    </CCol>
                  </>
                ) : null}
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
                  {errors.status.length > 0 && <InputError>{errors.status}</InputError>}
                </CCol>

                <CCol md={12} className="d-flex">
                  <SubmitButton>
                    {submitting ? (
                      <>
                        <CSpinner component="span" size="sm" aria-hidden="true" /> Loading...
                      </>
                    ) : (
                      `${update ? 'Update' : 'Save'} Category`
                    )}
                  </SubmitButton>
                  <CButton
                    style={{ marginLeft: '10px' }}
                    type="button"
                    onClick={() => {
                      navigate('/categories')
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
export default AddCategory
