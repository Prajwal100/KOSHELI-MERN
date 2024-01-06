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
  CSpinner,
} from '@coreui/react'
import SubmitButton from 'src/components/page/SubmitButton'
import { useNavigate, useMatch } from 'react-router-dom'
import { validateForm } from '../../utils/helper'
import subCategoryService from 'src/services/admin/subCategoryService'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import { useDispatch, useSelector } from 'react-redux'
import categoryService from 'src/services/admin/categoryService'
import Select from 'react-select'
import InputError from 'src/components/page/InputError'
const AddSubCategory = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialFormErrors = {
    name: '',
    description: '',
    status: '',
    category: '',
  }

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState({ value: 'active', label: 'active' })
  const [category, setCategory] = useState(null)
  const [errors, setErrors] = useState(initialFormErrors)
  const [submitting, setSubmitting] = useState(false)

  const categories = useSelector((state) => state.categoryReducer.categories)
  const subcategories = useSelector((state) => state.subCategoryReducer.subcategories)
  const match = useMatch('/subcategory/:id/edit')
  const [id, setId] = useState('')
  const [update, setUpdate] = useState(false)

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
    err.category = !category ? 'Please select a category.' : ''
    err.status = !status ? 'Please choose a status.' : ''

    setErrors({ ...err })
    return validateForm(err)
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        await categoryService.getCategories(dispatch)
      } catch (e) {
        console.error(e)
      }
    }
    if (!categories || categories.length === 0) {
      fetchCategories()
    }
  })

  useEffect(() => {
    if (match) {
      setId(match.params.id)
      setUpdate(true)
    }
  }, [match])

  useEffect(() => {
    const fetchSubcategories = async () => {
      await subCategoryService.getSubCategories(dispatch)
    }
    if (update) {
      if (!subcategories && subcategories.length === 0) {
        fetchSubcategories()
      }

      const subcategory = subcategories.find((subcategory) => subcategory._id.toString() === id)

      if (subcategory) {
        setName(subcategory.name)
        setDescription(subcategory.description)
        setCategory({
          _id: subcategory.category && subcategory.category._id,
          value: subcategory.category && subcategory.category._id,
          label: subcategory.category && subcategory.category.name,
        })
        setStatus({
          value: subcategory.status,
          label: subcategory.status,
        })
      }
    }
  }, [dispatch, id, subcategories, update])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateInputs()) {
      setSubmitting(true)
      if (update) {
        try {
          let res = await subCategoryService.updateSubCategory(
            id,
            {
              name,
              description,
              status: status.value,

              category,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/subcategories')
          }
        } catch (e) {
          toast.error(e.message, ToastObjects)
        }
      } else {
        try {
          let res = await subCategoryService.addSubCategory(
            {
              name,
              description,
              status: status.value,
              category,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/subcategories')
          }
        } catch (e) {
          toast.error(e.message, ToastObjects)
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
            <CCardHeader>{update ? 'Update' : 'Add'} Subcategory</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
                <CCol md={12}>
                  <CFormLabel htmlFor="name">
                    Name <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    invalid={errors.name.length > 0}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sub-Category name"
                  />
                  {errors && errors.name.length > 0 && <InputError>{errors.name}</InputError>}
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea
                    invalid={errors.description.length > 0}
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description..."
                  />
                  {errors && errors.description.length > 0 && (
                    <InputError>{errors.description}</InputError>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="category">
                    Category <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <Select
                    invalid={errors.category.length > 0}
                    name="category"
                    value={category}
                    options={categories.map((category) => {
                      return {
                        _id: category.id,
                        value: category._id,
                        label: category.name,
                      }
                    })}
                    onChange={(option) =>
                      setCategory({
                        _id: option.value,
                        value: option.value,
                        label: option.label,
                      })
                    }
                  />
                  {errors && errors.category.length > 0 && (
                    <InputError>{errors.category}</InputError>
                  )}
                </CCol>

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

                <CCol md={6} className="d-flex">
                  <SubmitButton>
                    {submitting ? (
                      <>
                        <CSpinner component="span" size="sm" aria-hidden="true" /> Loading...
                      </>
                    ) : (
                      `${update ? 'Update' : 'Save'} Sub-Category`
                    )}
                  </SubmitButton>
                  <CButton
                    style={{ marginLeft: '10px' }}
                    type="button"
                    onClick={() => {
                      navigate('/subcategories')
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
export default AddSubCategory
