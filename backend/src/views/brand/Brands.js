import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTooltip, CButton, CImage } from '@coreui/react'
import { Badge } from 'react-bootstrap'
import { cilPencil, cilTrash } from '@coreui/icons'
import { cilPlus } from '@coreui/icons'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import { UPLOAD_URL } from '../../config'
import brandServices from 'src/services/admin/brandService'
const Brand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const brands = useSelector((state) => state.brandReducer.brands)

  useEffect(() => {
    try {
      brandServices.getAdminBrands(dispatch)
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  async function deleteBrand(id) {
    let message = window.confirm('Are you sure you want to delete?')
    if (message) {
      try {
        let res = await brandServices.deleteAdminBrand(id, dispatch)
        console.log(res)
        if (res && res.status) {
          toast.success(res.message, ToastObjects)
        }
      } catch (error) {
        toast.error(error.message, ToastObjects)
        console.error(error)
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
      name: 'Logo',
      selector: (row) =>
        row.image ? (
          <CImage
            style={{ width: '40%' }}
            alt="Brand image"
            className="img-fluid p-3"
            src={UPLOAD_URL + row.image}
          />
        ) : (
          '-'
        ),
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
          <CTooltip content="Edit" placement="top">
            <CButton
              onClick={() => {
                navigate(`/brand/${row.id}/edit`)
              }}
              color="info"
              className="addItemBtn mr-2"
              style={{ float: 'right', marginRight: '10px' }}
            >
              <CIcon icon={cilPencil} size="sm" />
            </CButton>
          </CTooltip>
          <CTooltip content="Delete" placement="top">
            <CButton
              onClick={() => deleteBrand(row.id)}
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

  const data = brands.map((brand) => {
    return {
      id: brand._id,
      name: brand.name,
      image: brand.logo,
      status: brand.status,
    }
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>
                Brand List
                <CTooltip content="Add Brand" placement="top">
                  <CButton
                    onClick={() => {
                      navigate('/brand/add')
                    }}
                    color="warning"
                    className="addItemBtn"
                    style={{ float: 'right' }}
                  >
                    <CIcon icon={cilPlus} size="sm" /> Add Brand
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

export default Brand
