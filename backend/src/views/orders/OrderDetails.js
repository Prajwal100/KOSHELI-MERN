import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CButton,
  CImage,
  CForm,
} from '@coreui/react'
import Select from 'react-select'
import SubmitButton from 'src/components/page/SubmitButton'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useMatch } from 'react-router-dom'
import userService from 'src/services/admin/userService'
import { getDateTime, toTitleCase } from 'src/utils/helper'
import { toast } from 'react-toastify'
import { ToastObjects } from 'src/utils/toast/toastObject'
import orderServices from 'src/services/admin/orderService'
import { UPLOAD_URL } from 'src/config'
import settingsService from 'src/services/admin/settingsService'
const User = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch('/order/:id/details')
  const orders = useSelector((state) => state.orderReducer.orders)
  const [id, setId] = useState('')
  const [status, setStatus] = useState({ value: '', label: '' })
  const [order, setOrder] = useState({})

  const symbol = useSelector((state) => state.settingsReducer.settings.symbol)

  useEffect(() => {
    if (!symbol) {
      try {
        settingsService.getSettings(dispatch)
      } catch (err) {
        toast.error(err.message, ToastObjects)
      }
    }

    if (match) {
      setId(match.params.id)
    }
  }, [dispatch, match, symbol])
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await orderServices.getOrders(dispatch)
      } catch (e) {
        console.error(e)
      }
    }

    if (!orders || orders.length === 0) {
      fetchOrder()
    }

    const orderData = orders.find((order) => order._id.toString() === id)

    if (orderData) {
      setOrder(orderData)
      setStatus({
        value: orderData.orderStatus,
        label: toTitleCase(orderData.orderStatus),
      })
    }
  }, [dispatch, orders, id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await orderServices.updateOrder(
        id,
        {
          orderStatus: status.value,
        },
        dispatch,
      )
      if (res && res.status) {
        toast.success(res.message, ToastObjects)
        navigate(-1)
      }
    } catch (e) {
      toast.error(e.message, ToastObjects)
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>Order Details</div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow className="p-3">
              <CCol md={6} className="border p-2">
                <p>
                  <span className="strong">Order ID : #{order.orderID}</span>
                </p>
                <p>
                  <span className="strong">Order Date : {getDateTime(order.createdAt)}</span>
                </p>
                <p>
                  <span className="strong">Name : {order.user && order.user.name}</span>
                </p>
                <p>
                  <span className="strong">
                    Phone Number : {order.user && order.user.phone ? order.user.phone : '-'}
                  </span>
                </p>
                <p>
                  <span className="strong">Email Address : {order.user && order.user.email}</span>
                </p>
              </CCol>
              <CCol md={6} className="border p-2">
                <h6>Shipping Address</h6>
                {order.shippingAddress ? (
                  <p>
                    {order.shippingAddress && order.shippingAddress.address}, <br />
                    {order.shippingAddress && order.shippingAddress.country} <br />
                    {order.shippingAddress && order.shippingAddress.postalCode}
                  </p>
                ) : (
                  '-'
                )}
              </CCol>
            </CRow>
            <br></br>
            <CRow>
              <CCol md={12}>
                <h5>Order Items</h5>
                <CTable striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#S.N.</CTableHeaderCell>
                      <CTableHeaderCell scope="col">ITEM</CTableHeaderCell>
                      <CTableHeaderCell scope="col">IMAGE</CTableHeaderCell>
                      <CTableHeaderCell scope="col">PRICE</CTableHeaderCell>
                      <CTableHeaderCell scope="col">QTY</CTableHeaderCell>
                      <CTableHeaderCell scope="col">TOTAL</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {order.orderItems &&
                      order.orderItems.map((data, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">1</CTableHeaderCell>
                          <CTableDataCell>{data.name}</CTableDataCell>
                          <CTableDataCell>
                            <CImage
                              src={UPLOAD_URL + data.image}
                              className="img-fluid"
                              height="150"
                              width="150"
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            {symbol}
                            {data.price}
                          </CTableDataCell>
                          <CTableDataCell>{data.quantity}</CTableDataCell>
                          <CTableDataCell>
                            {symbol}
                            {data.price * data.quantity}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
            <br></br>

            <CRow>
              <CCol md={6}>
                <h6>Customer Message :</h6>
                <p>lorem text</p>
              </CCol>
              <CCol md={6}>
                <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
                  <CTable bordered>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>Sub Total </CTableDataCell>
                        <CTableDataCell>
                          {symbol}
                          {order.orderPrice}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Shipping Charge </CTableDataCell>
                        <CTableDataCell>
                          {symbol}
                          {order.shippingPrice}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Coupon Discount </CTableDataCell>
                        <CTableDataCell>
                          {symbol}
                          {order.discount}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Total Amount</CTableDataCell>
                        <CTableDataCell>
                          {symbol}
                          {order.totalPrice}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Status</CTableDataCell>
                        <CTableDataCell>
                          <Select
                            isDisabled={
                              order.orderStatus === 'delivered' || order.orderStatus === 'cancelled'
                                ? true
                                : false
                            }
                            name="status"
                            value={status}
                            options={['pending', 'processing', 'delivered', 'cancelled'].map(
                              (item) => {
                                return {
                                  value: item,
                                  label: item,
                                }
                              },
                            )}
                            onChange={(option) => {
                              setStatus(option)
                            }}
                          />
                        </CTableDataCell>
                      </CTableRow>

                      <CTableRow>
                        <CTableDataCell>Action</CTableDataCell>

                        <CTableDataCell className="d-flex">
                          <SubmitButton>Update Changes</SubmitButton>
                          <CButton
                            style={{ marginLeft: '10px' }}
                            type="button"
                            onClick={() => {
                              navigate(-1)
                            }}
                            color="warning"
                          >
                            Back to list
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CForm>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
