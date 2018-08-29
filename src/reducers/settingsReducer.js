import {
  DISABLE_BALANCE_ON_EDIT,
  DISABLE_BALANCE_ON_ADD,
  ALLOW_REGISTRATION,
} from '../actions/types'

const initialState = {
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: false,
  allowRegistration: true,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: action.payload,
      }
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload,
      }
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload,
      }
    default:
      return state
  }
}
