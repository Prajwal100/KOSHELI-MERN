import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTooltip, CButton, CImage } from '@coreui/react'
import { Badge } from 'react-bootstrap'
import { cilMenu, cilPencil, cilTrash } from '@coreui/icons'
import { cilPlus } from '@coreui/icons'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import { UPLOAD_URL } from '../../config'
import productServices from 'src/services/admin/productService'
import settingsService from 'src/services/admin/settingsService'
const Product = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const products = useSelector((state) => state.productReducer.products)
  const symbol = useSelector((state) => state.settingsReducer.settings.symbol)

  useEffect(() => {
    if (!symbol) {
      try {
        settingsService.getSettings(dispatch)
      } catch (err) {
        toast.error(err.message, ToastObjects)
      }
    }
    try {
      productServices.getProducts(dispatch)
    } catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  async function deleteProduct(id) {
    console.log(id)
    let message = window.confirm('Are you sure you want to delete?')
    if (message) {
      try {
        let res = await productServices.deleteProduct(id, dispatch)
        console.log(res)
        if (res && res.status) {
          toast.success(res.message, ToastObjects)
        }
      } catch (error) {
        toast.error(error.message, ToastObjects)
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo((clickHandler) => [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Thumbnail Image',
      selector: (row) =>
        row.thumbnail_image ? (
          <CImage
            alt="featured image"
            className="img-fluid p-3"
            src={UPLOAD_URL + row.thumbnail_image}
          />
        ) : (
          '-'
        ),
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => (row && row.category ? row.category.name : '-'),
      sortable: true,
    },
    {
      name: 'Sub-Category',
      selector: (row) => (row && row.subcategory ? row.subcategory.name : '-'),
      sortable: true,
    },
    {
      name: 'Brand',
      selector: (row) => (row && row.brand ? row.brand.name : '-'),
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => symbol + row.price.toLocaleString('en-US'),
      sortable: true,
    },
    {
      name: 'Discount',
      selector: (row) => (row.discount ? symbol + row.discount.toLocaleString('en-US') : '-'),
      sortable: true,
    },
    {
      name: 'PriceAfterDiscount',
      selector: (row) => symbol + row.priceAfterDiscount.toLocaleString('en-US'),
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },

    {
      name: 'Status',
      selector: (row) => (
        <Badge bg={`${row.status === 'active' ? 'success' : 'warning'}`}>{row.status}</Badge>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <CTooltip content="View" placement="top">
            <CButton
              onClick={() => {
                navigate(`/product/${row.id}/view`)
              }}
              color="info"
              className="addItemBtn mr-2"
              style={{ float: 'right', marginRight: '10px' }}
            >
              <CIcon icon={cilMenu} size="sm" />
            </CButton>
          </CTooltip>
          <CTooltip content="Edit" placement="top">
            <CButton
              onClick={() => {
                navigate(`/product/${row.id}/edit`)
              }}
              color="primary"
              className="addItemBtn mr-2"
              style={{ float: 'right', marginRight: '10px' }}
            >
              <CIcon icon={cilPencil} size="sm" />
            </CButton>
          </CTooltip>
          <CTooltip content="Delete" placement="top">
            <CButton
              onClick={() => deleteProduct(row.id)}
              color="danger"
              className="addItemBtn"
              style={{ float: 'right' }}
            >
              <CIcon icon={cilTrash} size="sm" />
            </CButton>
          </CTooltip>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ])

  const data = products.map((product) => {
    return {
      id: product._id,
      name: product.name,
      thumbnail_image: product.thumbnailImage,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      price: product.price,
      discount: product.discount,
      priceAfterDiscount: product.priceAfterDiscount,
      quantity: product.quantity,
      status: product.status,
    }
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>
                Product List
                <CTooltip content="Add Product" placement="top">
                  <CButton
                    onClick={() => {
                      navigate('/product/add')
                    }}
                    color="warning"
                    className="addItemBtn"
                    style={{ float: 'right' }}
                  >
                    <CIcon icon={cilPlus} size="sm" /> Add Product
                  </CButton>
                </CTooltip>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <DataTable columns={columns} data={data} pagination />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Product
