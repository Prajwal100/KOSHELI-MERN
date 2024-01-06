import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
  CButton,
  CImage,
  CSpinner,
} from '@coreui/react'
import { Badge } from 'react-bootstrap'
import { cilTrash, cilMenu, cilCloudDownload } from '@coreui/icons'
import DataTable from 'react-data-table-component'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import orderServices from 'src/services/admin/orderService'
import http from 'src/services/api'
const Users = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [downloading, setDownloading] = useState(false)

  const { status } = useParams()

  let orders = useSelector((state) => state.orderReducer.orders)

  if (status !== null) {
    if (status === 'pending') {
      orders = orders.filter((order) => order.orderStatus === 'pending')
    } else if (status === 'processing') {
      orders = orders.filter((order) => order.orderStatus === 'processing')
    } else if (status === 'delivered') {
      orders = orders.filter((order) => order.orderStatus === 'delivered')
    } else if (status === 'cancelled') {
      orders = orders.filter((order) => order.orderStatus === 'cancelled')
    }
  }

  useEffect(() => {
    if (!orders || (Array.isArray(orders) && orders.length < 1)) {
      try {
        orderServices.getOrders(dispatch)
      } catch (error) {
        console.error(error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const downloadInvoice = async (orderId) => {
    setDownloading(true)
    try {
      const res = await http.get(`/api/v1/admin/order/invoice/${orderId}`, {
        responseType: 'blob',
      })

      let url = window.URL.createObjectURL(res)
      console.log(url)
      let a = document.createElement('a')
      a.href = url
      a.download = `${orderId}.pdf`
      a.click()
    } catch (e) {
      toast.error(e.message, ToastObjects)
    } finally {
      setDownloading(false)
    }
  }

  async function deleteOrder(id) {
    console.log(id)
    let message = window.confirm('Are you sure you want to delete?')
    if (message) {
      try {
        let res = await orderServices.deleteOrder(id, dispatch)
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

  const orderStatus = (string) => {
    if (string === 'pending') {
      return 'primary'
    } else if (string === 'processing') {
      return 'info'
    } else if (string === 'delivered') {
      return 'success'
    } else if (string === 'cancelled') {
      return 'danger'
    }
  }

  const columns = useMemo((clickHandler) => [
    {
      name: 'OrderID',
      selector: (row) => '#' + row.orderID,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: 'Total Price',
      selector: (row) => row.totalPrice,
      sortable: true,
    },

    {
      name: 'Payment Method',
      selector: (row) => (row.paymentMethod === 'cod' ? 'Cash on Delivery' : row.paymentMethod),
      sortable: true,
    },

    {
      name: 'Payment Status',
      selector: (row) => (
        <Badge bg={`${row.paymentStatus === 'paid' ? 'success' : 'warning'}`}>
          {row.paymentStatus}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: 'Order Status',
      selector: (row) => <Badge bg={orderStatus(row.orderStatus)}>{row.orderStatus}</Badge>,
      sortable: true,
    },

    {
      name: 'Actions',
      cell: (row) => (
        <>
          <CTooltip content="Download Invoice" placement="top">
            <CButton
              onClick={() => downloadInvoice(row.id)}
              color="info"
              className="addItemBtn mr-2"
              style={{ float: 'right', marginRight: '10px' }}
            >
              {downloading ? (
                <>
                  <CSpinner component="span" size="sm" aria-hidden="true" />
                </>
              ) : (
                <CIcon icon={cilCloudDownload} size="sm" />
              )}
            </CButton>
          </CTooltip>
          <CTooltip content="Details" placement="top">
            <CButton
              onClick={() => {
                navigate(`/order/${row.id}/details`)
              }}
              color="primary"
              className="addItemBtn mr-2"
              style={{ float: 'right', marginRight: '10px' }}
            >
              <CIcon icon={cilMenu} size="sm" />
            </CButton>
          </CTooltip>
          <CTooltip content="Delete" placement="top">
            <CButton
              onClick={() => deleteOrder(row.id)}
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

  const data = orders.map((order) => {
    return {
      id: order._id,
      orderID: order.orderID,
      name: order.user.name,
      email: order.user.email,
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
    }
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>Order List</div>
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
