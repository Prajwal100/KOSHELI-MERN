import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Sliders = React.lazy(() => import('./views/slider/Sliders'))
const AddSlider = React.lazy(() => import('./views/slider/AddSlider'))

const Categories = React.lazy(() => import('./views/category/Categories'))
const AddCategory = React.lazy(() => import('./views/category/AddCategory'))

const SubCategories = React.lazy(() => import('./views/subcategory/SubCategories'))
const AddSubCategory = React.lazy(() => import('./views/subcategory/AddSubCategory'))

const Brands = React.lazy(() => import('./views/brand/Brands'))
const AddBrand = React.lazy(() => import('./views/brand/AddBrand'))

const Products = React.lazy(() => import('./views/product/Products'))
const AddProduct = React.lazy(() => import('./views/product/AddProduct'))
const ViewProduct = React.lazy(() => import('./views/product/Product'))

const Orders = React.lazy(() => import('./views/orders/Orders'))
const OrderDetails = React.lazy(() => import('./views/orders/OrderDetails'))

const GeneralSettings = React.lazy(() => import('./views/settings/GeneralSettings'))

const Users = React.lazy(() => import('./views/users/Users'))
const EditUser = React.lazy(() => import('./views/users/User'))

const Profile = React.lazy(() => import('./views/profile/Profile'))
const ProfileSettings = React.lazy(() => import('./views/profile/ProfileSettings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // =================SLIDER ROUTES STARTS=====================================

  { path: '/sliders', name: 'Sliders', element: Sliders, exact: true },
  { path: '/sliders/add', name: 'Add Slider', element: AddSlider, exact: true },
  { path: '/sliders/:id/edit', name: 'Edit Slider', element: AddSlider, exact: true },

  // =================SLIDER ROUTES ENDS========================================

  // =================CATEGORY ROUTES STARTS===================================

  { path: '/categories', name: 'Categories', element: Categories, exact: true },
  { path: '/category/add', name: 'Add Category', element: AddCategory, exact: true },
  { path: '/category/:id/edit', name: 'Edit Category', element: AddCategory, exact: true },

  // =================CATEGORY ROUTES ENDS=====================================

  // =================SUB-CATEGORY ROUTES STARTS===================================

  { path: '/subcategories', name: 'Sub Categories', element: SubCategories, exact: true },
  { path: '/subcategory/add', name: 'Add Sub Category', element: AddSubCategory, exact: true },
  {
    path: '/subcategory/:id/edit',
    name: 'Edit Sub Category',
    element: AddSubCategory,
    exact: true,
  },

  // =================SUB-CATEGORY ROUTES ENDS=====================================

  // =================BRAND ROUTES STARTS===================================

  { path: '/brands', name: 'Brands', element: Brands, exact: true },
  { path: '/brand/add', name: 'Add Brand', element: AddBrand, exact: true },
  { path: '/brand/:id/edit', name: 'Edit Brand', element: AddBrand, exact: true },

  // =================BRAND ROUTES ENDS=====================================

  // =================PRODUCT ROUTES STARTS===================================

  { path: '/products', name: 'Products', element: Products, exact: true },
  { path: '/product/add', name: 'Add Product', element: AddProduct, exact: true },
  { path: '/product/:id/edit', name: 'Edit Product', element: AddProduct, exact: true },
  { path: '/product/:id/view', name: 'View Product', element: ViewProduct, exact: true },

  // =================PRODUCT ROUTES ENDS=====================================

  // =================ORDER ROUTES STARTS===================================

  { path: '/orders/:status', name: 'Orders', element: Orders, exact: true },
  { path: '/pending-orders', name: 'Pending Orders', element: Orders, exact: true },
  { path: '/order/:id/details', name: 'Order Details', element: OrderDetails, exact: true },

  // =================ORDER ROUTES ENDS=====================================

  // =================SETTINGS ROUTES STARTS===================================

  { path: '/general-settings', name: 'Geneal Settings', element: GeneralSettings, exact: true },

  // =================SETTINGS ROUTES ENDS=====================================

  // =================USERS ROUTES STARTS===================================

  { path: '/users', name: 'Users', element: Users, exact: true },
  { path: '/user/:id/edit', name: 'Edit User', element: EditUser, exact: true },

  // =================SETTINGS ROUTES ENDS=====================================

  // =================PROFILE ROUTES STARTS===================================

  { path: '/profile-settings', name: 'Profile Settings', element: ProfileSettings, exact: true },
  { path: '/profile', name: 'Profile', element: Profile, exact: true },

  // =================PROFILE ROUTES ENDS=====================================
]

export default routes
