import {
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION,
  DISABLE_BALANCE_ON_ADD,
} from './types'

export const setDisableBalanceOnAdd = () => {
  //Get setting from localStorage
  const settings = JSON.parse(localStorage.getItem('settings'))
  //Toggle value
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd
  //Update local storage
  localStorage.setItem('settings', JSON.stringify(settings))
  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd,
  }
}

export const setAllowRegistration = () => {
  //Get setting from localStorage
  const settings = JSON.parse(localStorage.getItem('settings'))
  //Toggle value
  settings.allowRegistration = !settings.allowRegistration
  //Update local storage
  localStorage.setItem('settings', JSON.stringify(settings))

  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration,
  }
}

export const setDisableBalanceOnEdit = () => {
  //Get setting from localStorage
  const settings = JSON.parse(localStorage.getItem('settings'))
  //Toggle value
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit
  //Update local storage
  localStorage.setItem('settings', JSON.stringify(settings))

  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit,
  }
}
