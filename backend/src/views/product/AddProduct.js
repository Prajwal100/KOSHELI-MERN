import React, { useState, useEffect, useRef } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CFormLabel,
  CRow,
  CButton,
  CImage,
  CSpinner,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import SubmitButton from 'src/components/page/SubmitButton'
import { useNavigate, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import categoryService from 'src/services/admin/categoryService'
import subCategoryService from 'src/services/admin/subCategoryService'
import brandServices from 'src/services/admin/brandService'
import { toast } from 'react-toastify'
import { ToastObjects } from 'src/utils/toast/toastObject'
import { validateForm } from 'src/utils/helper'
import productServices from 'src/services/admin/productService'
import InputError from 'src/components/page/InputError'
import { UPLOAD_URL } from 'src/config'
import http from 'src/services/api'
import settingsService from 'src/services/admin/settingsService'

// Rich text editor
import JoditEditor from 'jodit-react'
import { getSubCategoriesOfCategory } from 'src/store/actions/subCategoryActions'

const AddProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const editor = useRef(null)

  const categories = useSelector((state) => state.categoryReducer.categories)
  let subcategories = useSelector((state) => state.subCategoryReducer.subcategories)
  const brands = useSelector((state) => state.brandReducer.brands)
  const products = useSelector((state) => state.productReducer.products)
  const symbol = useSelector((state) => state.settingsReducer.settings.symbol)

  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')

  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [thumbnail, setThumbnail] = useState('')
  const [images, setImages] = useState(null)
  const [status, setStatus] = useState('active')

  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState(null)
  const [brand, setBrand] = useState(null)

  const initialFormErrors = {
    name: '',
    summary: '',
    description: '',
    category: '',
    subCategory: '',
    brand: '',
    price: '',
    quantity: '',
    discount: '',
    thumbnail: '',
    status: '',
    images: '',
  }
  const [errors, setErrors] = useState(initialFormErrors)
  const [update, setUpdate] = useState(false)
  const [id, setId] = useState('')
  const [uploading, setUploading] = useState(false)
  const match = useMatch('/product/:id/edit')

  const validateInputs = () => {
    const err = { ...errors }
    err.name = !name ? 'Name field is required' : ''
    err.summary = summary
      ? summary.length < 2
        ? 'Summary must be at least 2 characters.'
        : summary.length > 500
        ? 'Summary must be at most 500 characters'
        : ''
      : ''

    err.description = description
      ? description.length < 2
        ? 'Description must be at least 2 characters.'
        : ''
      : ''

    err.category = !category ? 'Please select one category.' : ''
    err.brand = !brand ? 'Please select one brand.' : ''
    err.price = !price ? 'The price field is required.' : ''
    err.quantity = !quantity ? 'The quantity field is required.' : ''
    err.status = !status ? 'The status field is required.' : ''
    err.thumbnail = !thumbnail ? 'The thumbnail field is required.' : ''
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
    // Fetch the Product
    if (!products || products.length === 0) {
      try {
        productServices.getProducts(dispatch)
      } catch (err) {
        toast.error(err.message, ToastObjects)
      }
    }

    // Fetch the Categories
    if (!categories || categories.length === 0) {
      try {
        categoryService.getCategories(dispatch)
      } catch (err) {
        toast.error(err.message, ToastObjects)
      }
    }

    // Fetch the SubCategories
    if (!subcategories || subcategories.length === 0) {
      try {
        subCategoryService.getSubCategories(dispatch)
      } catch (err) {
        toast.error(err.message, ToastObjects)
      }
    }

    // Fetch the brands
    if (!brands || brands.length === 0) {
      try {
        brandServices.getAdminBrands(dispatch)
      } catch (err) {
        toast.error(err.message, ToastObjects)
      }
    }

    if (!symbol) {
      try {
        settingsService.getSettings(dispatch)
      } catch (err) {
        toast.error(err.message, ToastObjects)
      }
    }
    if (update) {
      const product = products.find((product) => product._id.toString() === id)
      if (product) {
        setName(product.name)
        setSummary(product.summary)
        setDescription(product.description)
        setCategory({
          _id: product && product.category && product.category._id,
          value: product && product.category && product.category._id,
          label: product && product.category && product.category.name,
        })
        if (product.subCategory) {
          setSubCategory({
            _id: product && product.subcategory && product.subcategory._id,
            value: product && product.subcategory && product.subcategory._id,
            label: product && product.subcategory && product.subcategory.name,
          })
        }
        setBrand({
          _id: product && product.brand && product.brand._id,
          value: product && product.brand && product.brand._id,
          label: product && product.brand && product.brand.name,
        })
        setPrice(product.price)
        setDiscount(product.discount)
        setQuantity(product.quantity)
        setThumbnail(product.thumbnailImage)
        setImages(product.images)
        setStatus(product.status)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, update, id, products])

  const handleCategories = async (e) => {
    setCategory({
      _id: e.value,
      _value: e.value,
      label: e.label,
    })

    try {
      subCategoryService.getSubCategoriesOfCategory(e.value, dispatch)
    } catch (e) {
      toast.error(e.message, ToastObjects)
    }
  }

  const uploadThumbnailImg = async (e) => {
    e.preventDefault()
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append('thumbnail_image', file)
    setUploading(true)
    try {
      let res = await http.post('/api/v1/admin/product/thumbnail_image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res && res.status) {
        const { url } = res.data
        setThumbnail(url)
      }
    } catch (e) {
      console.error(e)
    }
    setUploading(false)
  }
  const uploadImage = async (e) => {
    e.preventDefault()
    let files = e.target.files

    if (files.length > 5) {
      toast.error("Can't upload more than 5 images.", ToastObjects)
      const err = { ...errors }
      err.images = "Can't upload more than 5 images."
      setErrors({ ...err })
      return
    }

    let formData = new FormData()
    for (const key of Object.keys(files)) {
      formData.append('image', files[key])
    }
    setUploading(true)
    try {
      let res = await http.post('/api/v1/admin/product/image/upload', formData)
      if (res && res.status) {
        const { url } = res.data
        setImages(url)
      }
    } catch (e) {
      console.error(e)
    }
    setUploading(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateInputs()) {
      if (update) {
        try {
          let res = await productServices.updateProduct(
            id,
            {
              name,
              summary,
              description,
              category,
              subcategory: subCategory,
              brand,
              price,
              priceAfterDiscount: price - discount,
              discount,
              quantity,
              thumbnailImage: thumbnail,
              images,
              status,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/products')
          }
        } catch (e) {
          toast.error(e.message, ToastObjects)
        }
      } else {
        try {
          let res = await productServices.addProduct(
            {
              name,
              summary,
              description,
              category,
              subcategory: subCategory,
              brand,
              price,
              discount,
              quantity,
              thumbnailImage: thumbnail,
              images,
              status,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/products')
          }
        } catch (e) {
          toast.error(e.message, ToastObjects)
        }
      }
    }
  }
  return (
    <div>
      <CRow className="justify-content-center">
        <CCol lg={12} sm={12}>
          <CCard>
            <CCardHeader>{update ? 'Update' : 'Add'} Product</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
                <CCol md={12}>
                  <CFormLabel htmlFor="name">
                    Name <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    invalid={errors.name.length > 0}
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors && errors.name.length > 0 && <InputError>{errors.name}</InputError>}
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="summary">Summary</CFormLabel>
                  <CFormTextarea
                    type="text"
                    id="summary"
                    placeholder="Summary..."
                    invalid={errors.summary.length > 0}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                  {errors && errors.summary.length > 0 && <InputError>{errors.summary}</InputError>}
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>

                  <JoditEditor
                    ref={editor}
                    value={description}
                    tabIndex={1} // tabIndex of textarea
                    onChange={(text) => {
                      setDescription(text)
                    }}
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
                    value={category}
                    options={categories.map((category) => {
                      return {
                        _id: category._id,
                        value: category._id,
                        label: category.name,
                      }
                    })}
                    onChange={handleCategories}
                  ></Select>
                  {errors && errors.category.length > 0 && (
                    <InputError>{errors.category}</InputError>
                  )}
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="subcategory">Subcategory</CFormLabel>
                  <Select
                    value={subCategory}
                    options={subcategories.map((subCategory) => {
                      return {
                        _id: subCategory._id,
                        value: subCategory._id,
                        label: subCategory.name,
                      }
                    })}
                    onChange={(item) => {
                      setSubCategory({
                        _id: item.value,
                        _value: item.value,
                        label: item.label,
                      })
                    }}
                  ></Select>
                  {errors && errors.subCategory.length > 0 && (
                    <InputError>{errors.name}</InputError>
                  )}
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="brand">
                    Brand <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <Select
                    value={brand}
                    options={brands.map((brand) => {
                      return {
                        _id: brand._id,
                        value: brand._id,
                        label: brand.name,
                      }
                    })}
                    onChange={(item) => {
                      setBrand({
                        _id: item.value,
                        value: item.value,
                        label: item.label,
                      })
                    }}
                  ></Select>
                  {errors && errors.brand.length > 0 && <InputError>{errors.brand}</InputError>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="name">
                    Price <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>{symbol}</CInputGroupText>
                    <CFormInput
                      type="number"
                      id="name"
                      placeholder="Price number"
                      min="0"
                      step="any"
                      invalid={errors.price.length > 0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </CInputGroup>
                  {errors && errors.price.length > 0 && <InputError>{errors.price}</InputError>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="discount">Discount</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>{symbol}</CInputGroupText>
                    <CFormInput
                      step="any"
                      type="number"
                      id="discount"
                      placeholder="Discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                    {errors && errors.discount.length > 0 && (
                      <InputError>{errors.discount}</InputError>
                    )}
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="quantity">
                    Quantity <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    step="any"
                    type="number"
                    id="quantity"
                    invalid={errors.quantity.length > 0}
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  {errors && errors.quantity.length > 0 && (
                    <InputError>{errors.quantity}</InputError>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="image">
                    Featured Image <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    invalid={errors.thumbnail.length > 0}
                    onChange={uploadThumbnailImg}
                  />
                  {errors && errors.thumbnail.length > 0 && (
                    <InputError>{errors.thumbnail}</InputError>
                  )}
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="image">
                    Images{' '}
                    <small className="text-warning">
                      [The maximum number of images allowed is 5. ]
                    </small>
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    invalid={errors.images.length > 0}
                    onChange={uploadImage}
                    multiple
                  />
                  {errors && errors.images.length > 0 && <InputError>{errors.images}</InputError>}
                </CCol>
                {/* thumbnail image */}
                {uploading ? (
                  <CCol md={6}>
                    <CSpinner color="info" />
                  </CCol>
                ) : null}
                {thumbnail ? (
                  <>
                    <CCol md={6}>
                      <CFormLabel htmlFor="thumbnail_preview">Preview :</CFormLabel>
                      <br />
                      <CImage
                        className="px-2 img-fluid"
                        src={UPLOAD_URL + thumbnail}
                        alt="thumbnail image"
                        height="150px"
                        width="150px"
                      />
                    </CCol>
                  </>
                ) : null}
                {/* images */}
                {uploading ? (
                  <CCol md={6}>
                    <CSpinner color="info" />
                  </CCol>
                ) : null}
                {images && images.length > 0 ? (
                  <>
                    <CCol md={6}>
                      <CFormLabel htmlFor="image_preview">Preview :</CFormLabel>
                      <br></br>
                      {images.map((item, index) => {
                        return (
                          <CImage
                            key={index}
                            className="p-2 img-fluid"
                            src={UPLOAD_URL + item}
                            alt="product image"
                            height="150px"
                            width="150px"
                          />
                        )
                      })}
                    </CCol>
                  </>
                ) : null}

                <CCol md={6}>
                  <CFormLabel htmlFor="status">
                    Status <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormSelect
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value)
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </CFormSelect>
                  {errors && errors.status.length > 0 && <InputError>{errors.status}</InputError>}
                </CCol>

                <CCol md={12} className="d-flex">
                  <SubmitButton>{update ? 'Update' : 'Save'} Product</SubmitButton>
                  <CButton
                    style={{ marginLeft: '10px' }}
                    type="button"
                    onClick={() => {
                      navigate('/products')
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
export default AddProduct
