import { combineReducers } from 'redux'
import authReducer from './authReducer'
import sliderReducer from './sliderReducer'
import categoryReducer from './categoryReducer'
import subCategoryReducer from './subCategoryReducer'
import brandReducer from './brandReducer'
import productReducer from './productReducer'
import orderReducer from './orderReducer'
import settingsReducer from './settingsReducer'
import userReducer from './userReducer'
import dashboardReducer from './dashboardReducer'
const appReducer = combineReducers({
  user: authReducer,
  sliderReducer,
  categoryReducer,
  subCategoryReducer,
  brandReducer,
  productReducer,
  orderReducer,
  settingsReducer,
  userReducer,
  dashboardReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
