import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'
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
import SubmitButton from 'src/components/page/SubmitButton'
import { isValidHttpUrl, validateForm } from 'src/utils/helper'
import InputError from 'src/components/page/InputError'
import sliderService from 'src/services/admin/sliderService'
import { useDispatch, useSelector } from 'react-redux'
import http from '../../services/api'
import { UPLOAD_URL } from 'src/config'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import Select from 'react-select'
const AddSlider = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState({ value: 'active', label: 'active' })

  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const initialFormErrors = {
    name: '',
    link: '',
    description: '',
    image: '',
    status: '',
  }

  const [errors, setErrors] = useState(initialFormErrors)
  const validateInputs = () => {
    const err = { ...errors }

    err.name = !name ? 'Name is required.' : ''
    err.description = description
      ? description.length < 2
        ? 'Description must be at least 2 characters.'
        : description.length > 100
        ? 'Description must be maximum of 100 characters.'
        : ''
      : ''
    err.image = !image ? 'Please select a banner image.' : ''
    err.status = !status ? 'Please choose a status.' : ''
    err.link = link ? (isValidHttpUrl(link) ? '' : 'Please enter valid http url.') : ''

    setErrors({ ...err })
    return validateForm(err)
  }

  const match = useMatch('/sliders/:id/edit')
  const [update, setUpdate] = useState(false)
  const [id, setId] = useState('')
  const sliders = useSelector((state) => state.sliderReducer.sliders)
  useEffect(() => {
    if (match) {
      setUpdate(true)
      setId(match.params.id)
    }
  }, [match])

  useEffect(() => {
    async function fetchSlider() {
      try {
        await sliderService.getSliders(dispatch)
      } catch (error) {
        console.error(error)
      }
    }
    if (update) {
      if (!sliders || sliders.length === 0) {
        fetchSlider()
      }
      const slider = sliders.find((slider) => slider._id.toString() === id)
      if (slider) {
        setName(slider.name)
        setLink(slider.link)
        setDescription(slider.description)
        setStatus({
          value: slider.status,
          label: slider.status,
        })
        setImage(slider.image)
      }
    }
  }, [dispatch, sliders, id, update])

  const uploadSlider = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const res = await http.post('/api/v1/admin/slider/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const { url } = res.data
      setImage(url)
      setUploading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)
    if (validateInputs()) {
      setSubmitting(true)

      if (update) {
        try {
          const res = await sliderService.updateSlider(
            match.params.id,
            {
              name,
              description,
              link,
              status: status.value,
              image,
            },
            dispatch,
          )
          if (res && res.status) {
            navigate('/sliders', { replace: true })
            toast.success(res.message, ToastObjects)
          }
        } catch (error) {
          console.error(error)
          toast.error(error.message, ToastObjects)
        }
      } else {
        try {
          let res = await sliderService.addSlider(
            {
              name,
              description,
              link,
              status: status.value,
              image,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success('Successfully updated.', ToastObjects)
            navigate('/sliders', { replace: true })
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
            <CCardHeader>{update ? 'Update Slider' : 'Add Slider'}</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
                <CCol md={6}>
                  <CFormLabel htmlFor="name">
                    Name <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Slider name"
                    value={name}
                    invalid={errors.name.length > 0}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name.length > 0 && <InputError>{errors.name}</InputError>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="link">Link</CFormLabel>
                  <CFormInput
                    type="text"
                    id="link"
                    placeholder="Slider link"
                    value={link}
                    invalid={errors.link.length > 0}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  {errors.link.length > 0 && <InputError>{errors.link}</InputError>}
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    rows="3"
                    placeholder="Description..."
                    invalid={errors.description.length > 0}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  {errors.description.length > 0 && <InputError>{errors.description}</InputError>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="image">
                    Banner Image <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    onChange={uploadSlider}
                    invalid={errors.image.length > 0}
                  />
                  {errors.image.length > 0 && <InputError>{errors.image}</InputError>}
                </CCol>
                {uploading ? (
                  <CCol md={6}>
                    <CSpinner color="info" />
                  </CCol>
                ) : null}

                {image ? (
                  <>
                    <CCol md={6} className="py-4">
                      <CFormLabel htmlFor="preview">Preview :</CFormLabel>
                      <CImage
                        src={UPLOAD_URL + image}
                        className="px-3 img-fluid"
                        alt="slider banner"
                      ></CImage>
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
                  <SubmitButton submitting={submitting}>
                    {submitting ? (
                      <>
                        <CSpinner component="span" size="sm" aria-hidden="true" /> Loading...
                      </>
                    ) : (
                      `${update ? 'Update' : 'Save'} Slider`
                    )}
                  </SubmitButton>
                  <CButton
                    style={{ marginLeft: '10px' }}
                    type="button"
                    onClick={() => {
                      navigate('/sliders')
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
export default AddSlider
