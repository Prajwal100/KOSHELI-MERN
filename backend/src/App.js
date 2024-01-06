import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css'
import Toast from './utils/toast/toast'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Check the auth
function checkAuth() {
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    return true
  }
  return false
}
class App extends Component {
  render() {
    return (
      <>
        <Toast />
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route
                exact
                path="/login"
                name="Login Page"
                element={checkAuth() ? <Navigate to={{ pathname: '/' }} /> : <Login />}
              />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route
                path="*"
                name="Home"
                element={checkAuth() ? <DefaultLayout /> : <Navigate to={{ pathname: '/login' }} />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </>
    )
  }
}

export default App
