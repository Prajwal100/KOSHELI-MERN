import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CButton,
  CImage,
  CForm,
} from '@coreui/react'
import Select from 'react-select'
import SubmitButton from 'src/components/page/SubmitButton'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useMatch } from 'react-router-dom'
import { toTitleCase } from 'src/utils/helper'
import { toast } from 'react-toastify'
import { ToastObjects } from 'src/utils/toast/toastObject'
import productServices from 'src/services/admin/productService'
import { UPLOAD_URL } from 'src/config'
import settingsService from 'src/services/admin/settingsService'
import { Badge } from 'react-bootstrap'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
const parse = require('html-react-parser')
const Product = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch('/product/:id/view')
  const products = useSelector((state) => state.productReducer.products)
  const symbol = useSelector((state) => state.settingsReducer.settings.symbol)

  const [id, setId] = useState('')
  const [product, setProduct] = useState({})
  useEffect(() => {
    if (match) {
      setId(match.params.id)
    }
  }, [match])
  useEffect(() => {
    if (!symbol) {
      try {
        settingsService.getSettings(dispatch)
      } catch (err) {
        toast.error(err.message, ToastObjects)
      }
    }
    const fetchProduct = async () => {
      try {
        await productServices.getProducts(dispatch)
      } catch (e) {
        toast.error(e.message, ToastObjects)
      }
    }

    if (!products || products.length === 0) {
      fetchProduct()
    }

    const productData = products.find((product) => product._id.toString() === id)

    if (productData) {
      setProduct(productData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, products])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>
                Product Details
                <CButton
                  style={{ marginLeft: '10px' }}
                  type="button"
                  onClick={() => {
                    navigate('/products')
                  }}
                  color="warning"
                >
                  <CIcon icon={cilArrowLeft} size="sm" /> Back to list
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell className="py-4">Product Name </CTableDataCell>
                  <CTableDataCell className="py-4">{product.name}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Summary </CTableDataCell>
                  <CTableDataCell className="py-4">{product.summary}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Description </CTableDataCell>
                  <CTableDataCell className="py-4">
                    {product.description && parse(product.description)}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Category </CTableDataCell>
                  <CTableDataCell className="py-4">
                    {product.category && toTitleCase(product.category.name)}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Subcategory </CTableDataCell>
                  <CTableDataCell className="py-4">
                    {product.subcategory && product.subcategory.name
                      ? toTitleCase(product.subcategory.name)
                      : '-'}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Brand </CTableDataCell>
                  <CTableDataCell className="py-4">
                    {product.brand && toTitleCase(product.brand.name)}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Original Price </CTableDataCell>
                  <CTableDataCell className="py-4">
                    {symbol + ' '}
                    {product.price && product.price.toLocaleString('en-US')}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Price After Discount </CTableDataCell>
                  <CTableDataCell className="py-4">
                    {symbol + ' '}
                    {product.priceAfterDiscount &&
                      product.priceAfterDiscount.toLocaleString('en-US')}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Discount </CTableDataCell>
                  <CTableDataCell className="py-4">
                    {symbol + ' '}
                    {product.discount && product.discount.toLocaleString('en-US')}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Thumbnail Image </CTableDataCell>
                  <CTableDataCell className="py-4">
                    {product && product.thumbnailImage ? (
                      <CImage
                        className="img-fluid"
                        height="150px"
                        width="150px"
                        src={UPLOAD_URL + product.thumbnailImage}
                      ></CImage>
                    ) : (
                      '-'
                    )}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Images </CTableDataCell>
                  <CTableDataCell className="py-4">
                    {product && product.images
                      ? product.images.map((item, index) => {
                          return (
                            <CImage
                              key={index}
                              className="px-3 img-fluid "
                              height="150px"
                              width="150px"
                              src={UPLOAD_URL + item}
                            ></CImage>
                          )
                        })
                      : '-'}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="py-4">Quantity </CTableDataCell>
                  <CTableDataCell className="py-4">{product.quantity}</CTableDataCell>
                </CTableRow>

                <CTableRow>
                  <CTableDataCell className="py-4">Status</CTableDataCell>
                  <CTableDataCell className="py-4">
                    <Badge color="success">{product.status}</Badge>
                  </CTableDataCell>
                </CTableRow>

                <CTableRow>
                  <CTableDataCell className="py-4">Action</CTableDataCell>
                  <CTableDataCell className="py-4">
                    <CButton
                      style={{ marginLeft: '10px' }}
                      type="button"
                      onClick={() => {
                        navigate('/products')
                      }}
                      color="warning"
                    >
                      <CIcon icon={cilArrowLeft} size="sm" /> Back to list
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Product
