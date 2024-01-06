import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTooltip, CButton, CImage } from '@coreui/react'
import { Badge } from 'react-bootstrap'
import { cilPencil, cilTrash } from '@coreui/icons'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import { UPLOAD_URL } from '../../config'
import userServices from 'src/services/admin/userService'
import { getDateTime } from 'src/utils/helper'
import user from '../../assets/images/avatars/user.png'
const Users = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const users = useSelector((state) => state.userReducer.users)

  useEffect(() => {
    try {
      userServices.getUsers(dispatch)
    } catch (error) {
      toast.error(error.message, ToastObjects)
    }
  }, [dispatch])

  async function deleteUser(id) {
    console.log(id)
    let message = window.confirm('Are you sure you want to delete?')
    if (message) {
      try {
        let res = await userServices.deleteUser(id, dispatch)
        console.log(res)
        if (res && res.status) {
          toast.success(res.message, ToastObjects)
        }
      } catch (error) {
        toast.error(error.message, ToastObjects)
      }
    }
  }

  const userStatus = (string) => {
    if (string === 'pending') {
      return 'primary'
    } else if (string === 'inactive') {
      return 'warning'
    } else if (string === 'active') {
      return 'success'
    } else if (string === 'banned') {
      return 'danger'
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
      name: 'Avatar',
      selector: (row) =>
        row.avatar ? (
          <CImage
            style={{ width: '40%' }}
            alt="User Profile"
            className="img-fluid p-3"
            src={UPLOAD_URL + row.avatar}
          />
        ) : (
          <CImage alt="User Profile" className="img-fluid p-3" src={user} />
        ),
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Total Orders',
      selector: (row) => row.orders,
      sortable: true,
    },
    {
      name: 'role',
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => <Badge bg={userStatus(row.status)}>{row.status}</Badge>,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row) => getDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <CTooltip content="Edit" placement="top">
            <CButton
              onClick={() => {
                navigate(`/user/${row.id}/edit`)
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
              onClick={() => deleteUser(row.id)}
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

  const data = users.map((user) => {
    return {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      orders: user.order && user.order.length ? user.order.length : 0,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    }
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>User List</div>
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

export default Users
