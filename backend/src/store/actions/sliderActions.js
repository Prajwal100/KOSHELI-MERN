import {
  ADMIN_GET_SLIDERS,
  ADMIN_ADD_SLIDER,
  ADMIN_UPDATE_SLIDER,
  ADMIN_DELETE_SLIDER,
} from '../constants/sliderConstants'

// ======================== ADMIN SLIDERS ACTION ===============================

export function getAdminSliders(payload) {
  return { type: ADMIN_GET_SLIDERS, payload }
}

export function addAdminSlider(payload) {
  return { type: ADMIN_ADD_SLIDER, payload }
}

export function updateAdminSlider(payload) {
  return { type: ADMIN_UPDATE_SLIDER, payload }
}

export function deleteAdminSlider(payload) {
  return { type: ADMIN_DELETE_SLIDER, payload }
}
