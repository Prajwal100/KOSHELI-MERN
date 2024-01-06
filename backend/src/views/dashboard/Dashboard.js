import React, { useMemo, useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import { Badge } from 'react-bootstrap'

import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilPeople, cilMenu } from '@coreui/icons'
import DataTable from 'react-data-table-component'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DashboardWidget from './DashboardWidget'
import orderServices from 'src/services/admin/orderService'
import { toast } from 'react-toastify'
import { ToastObjects } from 'src/utils/toast/toastObject'
import userServices from 'src/services/admin/userService'
import { getDateTime } from 'src/utils/helper'
import defaultImg from 'src/assets/images/avatars/user.png'
import dashboardServices from 'src/services/admin/dashboardService'
import http from 'src/services/api'
const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userReports = useSelector((state) => state.dashboardReducer.userReports)
  const orderReports = useSelector((state) => state.dashboardReducer.orderReports)

  const userData = userReports.map((item) => {
    return item.count
  })

  const orderData = orderReports.map((item) => {
    return item.count
  })
  const orders = useSelector((state) => state.orderReducer.orders)
  let users = useSelector((state) => state.userReducer.users)
  users = users.slice(0, 12)

  useEffect(() => {
    try {
      orderServices.getOrders(dispatch)
    } catch (error) {
      toast.error(error, ToastObjects)
    }

    try {
      userServices.getUsers(dispatch)
    } catch (error) {
      toast.error(error, ToastObjects)
    }

    const fetchUserReports = async () => {
      try {
        await dashboardServices.getUserReports(dispatch)
      } catch (error) {
        toast.error(error, ToastObjects)
      }
    }
    const fetchOrderReports = async () => {
      try {
        await dashboardServices.getOrderReports(dispatch)
      } catch (error) {
        toast.error(error, ToastObjects)
      }
    }
    if (!userReports || userReports.length === 0) {
      fetchUserReports()
    }

    if (!orderReports || orderReports.length === 0) {
      fetchOrderReports()
    }
  }, [dispatch, userReports, orderReports])
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      name: 'Total Price',
      selector: (row) => row.totalPrice,
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
              onClick={(e) => downloadInvoice(row.id)}
              color="info"
              className="addItemBtn  mr-2"
              style={{ float: 'right', marginRight: '10px' }}
            >
              <CIcon icon={cilCloudDownload} size="sm" />
            </CButton>
          </CTooltip>
          <CTooltip content="Details" placement="top">
            <CButton
              onClick={() => {
                navigate(`/order/${row.id}/details`)
              }}
              color="primary"
              className="addItemBtn"
              style={{ float: 'right', marginRight: '10px' }}
            >
              <CIcon icon={cilMenu} size="sm" />
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
      totalPrice: order.totalPrice,
      orderStatus: order.orderStatus,
    }
  })

  const [downloading, setDownloading] = useState(false)

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

  return (
    <>
      <DashboardWidget />
      {/* <WidgetsDropdown /> */}
      <CRow>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>Income Chart</CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: [
                    'Jan',
                    'Feb',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'Aug',
                    'Sept',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: [
                    {
                      label: 'Income Data',
                      backgroundColor: 'rgba(151, 187, 205, 0.2)',
                      borderColor: 'rgba(151, 187, 205, 1)',
                      pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                      pointBorderColor: '#fff',
                      data: orderData,
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>User Chart</CCardHeader>
            <CCardBody>
              <CChartBar
                data={{
                  labels: [
                    'Jan',
                    'Feb',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'Aug',
                    'Sept',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: [
                    {
                      label: 'Users',
                      backgroundColor: '#f87979',
                      data: userData,
                    },
                  ],
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Latest Users{' '}
                  <CButton
                    color="info"
                    onClick={(e) => {
                      navigate('/users')
                    }}
                    className="btn-sm"
                  >
                    view all
                  </CButton>
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={item.avatar ? item.avatar : defaultImg} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.name}</div>
                    <div className="small text-medium-emphasis">
                      <span>New</span> | Joined Date: {getDateTime(item.createdAt)}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
        <CCol md={8}>
          <DataTable title="Latest Orders" columns={columns} data={data} pagination />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
