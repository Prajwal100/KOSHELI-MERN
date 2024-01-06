import {
  GET_HOME_SLIDERS,
  GET_HOME_CATEGORIES,
  GET_HOME_BRANDS,
  GET_HOME_TOP_PRODUCTS,
  GET_HOME_SETTINGS,
} from "../constants/homeConstants";

export function getHomeSliders(payload) {
  return { type: GET_HOME_SLIDERS, payload: payload };
}

export function getHomeCategories(payload) {
  return { type: GET_HOME_CATEGORIES, payload: payload };
}

export function getHomeBrands(payload) {
  return { type: GET_HOME_BRANDS, payload: payload };
}

export function getHomeTopProducts(payload) {
  return { type: GET_HOME_TOP_PRODUCTS, payload: payload };
}

export function getHomeSettings(payload) {
  return { type: GET_HOME_SETTINGS, payload: payload };
}
