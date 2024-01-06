/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTooltip, CButton } from '@coreui/react'
import { Badge } from 'react-bootstrap'
import { cilPencil, cilTrash } from '@coreui/icons'
import { cilPlus } from '@coreui/icons'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import subCategoryService from 'src/services/admin/subCategoryService'
const SubCategory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subcategories = useSelector((state) => state.subCategoryReducer.subcategories)

  useEffect(() => {
    try {
      subCategoryService.getSubCategories(dispatch)
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  async function deleteSubCategory(id) {
    console.log(id)
    let message = window.confirm('Are you sure you want to delete?')
    if (message) {
      try {
        let res = await subCategoryService.deleteSubCategory(id, dispatch)
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
      selector: (row) => (row.description ? row.description : '-'),
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => (row.category ? row.category.name : '-'),
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
                navigate(`/subcategory/${row.id}/edit`)
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
              onClick={() => deleteSubCategory(row.id)}
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

  const data = subcategories.map((subcategory) => {
    return {
      id: subcategory._id,
      name: subcategory.name,
      description: subcategory.description,
      category: subcategory.category,
      status: subcategory.status,
    }
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>
                Sub-category List
                <CTooltip content="Add Sub Category" placement="top">
                  <CButton
                    onClick={() => {
                      navigate('/subcategory/add')
                    }}
                    color="warning"
                    className="addItemBtn"
                    style={{ float: 'right' }}
                  >
                    <CIcon icon={cilPlus} size="sm" /> Add SubCategory
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

export default SubCategory
