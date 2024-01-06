import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTooltip, CButton, CImage } from '@coreui/react'
import { Badge } from 'react-bootstrap'
import { cilPencil, cilTrash } from '@coreui/icons'
import { cilPlus } from '@coreui/icons'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import sliderService from 'src/services/admin/sliderService'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import { UPLOAD_URL } from '../../config'
const Slider = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const sliders = useSelector((state) => state.sliderReducer.sliders)

  useEffect(() => {
    try {
      sliderService.getSliders(dispatch)
    } catch (error) {
      toast.error(error.message, ToastObjects)
    }
  }, [dispatch])

  async function deleteSlider(id) {
    console.log(id)
    let message = window.confirm('Are you sure you want to delete?')
    if (message) {
      try {
        let res = await sliderService.deleteSlider(id, dispatch)
        console.log(res)
        if (res && res.status) {
          toast.success('Slider successfully deleted.', ToastObjects)
        }
      } catch (error) {
        toast.error('Something went wrong while deleting slider', ToastObjects)
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
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Link',
      selector: (row) => row.link,
      sortable: true,
    },
    {
      name: 'Banner',
      selector: (row) => (
        <CImage alt="slider image" className="img-fluid p-3" src={UPLOAD_URL + row.image} />
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
                navigate(`/sliders/${row.id}/edit`)
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
              onClick={() => deleteSlider(row.id)}
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

  const data = sliders.map((slider) => {
    return {
      id: slider._id,
      name: slider.name,
      description: slider.description ? slider.description : '-',
      link: slider.link ? slider.link : '-',
      image: slider.image,
      status: slider.status,
    }
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>
                Slider{' '}
                <CTooltip content="Add Slider" placement="top">
                  <CButton
                    onClick={() => {
                      navigate('/sliders/add')
                    }}
                    color="warning"
                    className="addItemBtn"
                    style={{ float: 'right' }}
                  >
                    <CIcon icon={cilPlus} size="sm" /> Add Slider
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

export default Slider
