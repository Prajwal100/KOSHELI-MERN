import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilImagePlus,
  cilBriefcase,
  cilBasket,
  cilInbox,
  cilLibraryAdd,
  cilLayers,
  cilSettings,
  cilSpeedometer,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'SLIDER',
  },
  {
    component: CNavGroup,
    name: 'Sliders',
    to: '/sliders',
    icon: <CIcon icon={cilImagePlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Sliders',
        to: '/sliders',
      },
      {
        component: CNavItem,
        name: 'Create Slider',
        to: '/sliders/add',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Product',
  },

  {
    component: CNavGroup,
    name: 'Categories',
    to: '/categories',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Category',
        to: '/categories',
      },
      {
        component: CNavItem,
        name: 'Create Category',
        to: '/category/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Sub Categories',
    to: '/subcategories',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Sub-Category',
        to: '/subcategories',
      },
      {
        component: CNavItem,
        name: 'Create Sub-Category',
        to: '/subcategory/add',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Brands',
    to: '/brands',
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Brands',
        to: '/brands',
      },
      {
        component: CNavItem,
        name: 'Create Brands',
        to: '/brand/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Products',
        to: '/products',
      },
      {
        component: CNavItem,
        name: 'Create Products',
        to: '/product/add',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'ORDERS',
  },
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Orders',
        to: '/orders/all',
      },
      {
        component: CNavItem,
        name: 'Pending Orders',
        to: '/orders/pending',
      },
      {
        component: CNavItem,
        name: 'Process Orders',
        to: '/orders/processing',
      },
      {
        component: CNavItem,
        name: 'Delivered Orders',
        to: '/orders/delivered',
      },
      {
        component: CNavItem,
        name: 'Cancelled Orders',
        to: '/orders/cancelled',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Others',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'General Settings',
        to: '/general-settings',
      },
      // {
      //   component: CNavItem,
      //   name: 'Payment Gateway Setup',
      //   to: '/login',
      // },
    ],
  },

  // {
  //   component: CNavItem,
  //   name: 'Contact Messages',
  //   to: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  // },

  // {
  //   component: CNavItem,
  //   name: 'Subscribers',
  //   to: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  // },
]

export default _nav
