import React, { useEffect } from 'react'
import { CCard, CCardBody, CCol, CLink, CRow, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  cilBasket,
  cilPeople,
  cilImagePlus,
  cilBriefcase,
  cilLibraryAdd,
  cilInbox,
  cilLayers,
  cilDollar,
} from '@coreui/icons'
import dashboardServices from 'src/services/admin/dashboardService'
import settingsService from 'src/services/admin/settingsService'

const DashboardWidget = () => {
  const dispatch = useDispatch()
  const widgets = useSelector((state) => state.dashboardReducer.widgets)
  const settings = useSelector((state) => state.settingsReducer.settings)

  useEffect(() => {
    if (!widgets || Object.keys(widgets).length === 0) {
      dashboardServices.getDashboardWidgets(dispatch)
    }
    if (!settings || Object.keys(settings).length === 0) {
      settingsService.getSettings(dispatch)
    }
  }, [dispatch, widgets, settings])

  const incomeAmount =
    widgets.totalIncome && widgets.totalIncome.length > 0 ? widgets.totalIncome[0].totalAmount : 0
  const totalIncome = settings.symbol + incomeAmount
  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilImagePlus} size="xl" />}
              padding={false}
              title="Sliders"
              value={widgets.totalSliders}
              color="primary"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilBriefcase} size="xl" />}
              padding={false}
              title="Categories"
              value={widgets.totalCategories}
              color="info"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilBasket} size="xl" />}
              padding={false}
              title="SubCategories"
              value={widgets.totalSubCategories}
              color="warning"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilLibraryAdd} size="xl" />}
              padding={false}
              title="Brands"
              value={widgets.totalBrands}
              color="secondary"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilInbox} size="xl" />}
              padding={false}
              title="Products"
              value={widgets.totalProducts}
              color="danger"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilPeople} size="xl" />}
              padding={false}
              title="Users"
              value={widgets.totalUsers}
              color="warning"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilLayers} size="xl" />}
              padding={false}
              title="Orders"
              value={widgets.totalOrders}
              color="dark"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilDollar} size="xl" />}
              padding={false}
              title="income"
              value={totalIncome}
              color="success"
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default DashboardWidget
