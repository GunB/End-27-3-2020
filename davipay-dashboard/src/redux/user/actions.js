import menuActions from '../menu/actions'

const actions = {
  SET_STATE: 'user/SET_STATE',
  LOGIN: 'user/LOGIN',
  LOAD_CURRENT_ACCOUNT: 'user/LOAD_CURRENT_ACCOUNT',
  LOGOUT: 'user/LOGOUT',
  LOAD_MENU: menuActions.GET_DATA,
}

export default actions
