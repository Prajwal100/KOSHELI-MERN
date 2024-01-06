/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTooltip, CButton, CImage } from '@coreui/react'
import { Badge } from 'react-bootstrap'
import { cilPencil, cilTrash } from '@coreui/icons'
import { cilPlus } from '@coreui/icons'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import categoryService from 'src/services/admin/categoryService'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import { UPLOAD_URL } from '../../config'
const Category = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const categories = useSelector((state) => state.categoryReducer.categories)

  useEffect(() => {
    try {
      categoryService.getCategories(dispatch)
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  async function deleteCategory(id) {
    let message = window.confirm('Are you sure you want to delete?')
    if (message) {
      try {
        let res = await categoryService.deleteCategory(id, dispatch)
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

  const columns = useMemo((clickHandler) => [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Subcategory',
      selector: (row) =>
        row.subcategory !== '-'
          ? row.subcategory.map((item, index) => {
              return (
                <Badge bg="info" className="m-1" key={index}>
                  {item.name}
                </Badge>
              )
            })
          : '-',
      sortable: true,
    },
    {
      name: 'Image',
      selector: (row) =>
        row && row.image ? (
          <CImage alt="category image" className="img-fluid p-3" src={UPLOAD_URL + row.image} />
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
                navigate(`/category/${row.id}/edit`)
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
              onClick={() => deleteCategory(row.id)}
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

  const data = categories.map((category) => {
    return {
      id: category._id,
      name: category.name,
      description: category.description ? category.description : '-',
      subcategory: category.subcategory.length > 0 ? category.subcategory : '-',
      image: category.image,
      status: category.status,
    }
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>
                Category List
                <CTooltip content="Add Category" placement="top">
                  <CButton
                    onClick={() => {
                      navigate('/category/add')
                    }}
                    color="warning"
                    className="addItemBtn"
                    style={{ float: 'right' }}
                  >
                    <CIcon icon={cilPlus} size="sm" /> Add Category
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

export default Category
