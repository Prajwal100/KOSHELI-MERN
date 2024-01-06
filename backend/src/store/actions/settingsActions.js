import { ADMIN_GET_SETTINGS, ADMIN_UPDATE_SETTINGS } from 'src/store/constants/settingsConstants'

export function getSettings(payload) {
  return { type: ADMIN_GET_SETTINGS, payload }
}

export function updateSettings(payload) {
  return { type: ADMIN_UPDATE_SETTINGS, payload }
}
