import { store } from '../index'
import ROLES, { NONE } from '../constant/roles'

export const describeUsuario = () => {
  const user = { ...store.getState().user }
  let resp = NONE
  if (user.token) {
    const { decoded } = user.token
    const { roles } = decoded
    const keys = Object.keys(ROLES)
    keys.forEach(k => {
      if (RegExp(ROLES[k].ID.join('|')).test(roles)) {
        resp = ROLES[k]
      }
    })
    if (resp !== null) {
      resp = {
        ...resp,
      }
    }
  }

  return resp
}

export const roleUsuario = () => {
  return describeUsuario().NAME
}

export const validateRole = (roles = []) => {
  roles.push(ROLES.SUPERADMIN.NAME)
  const find = roles.find(r => {
    return typeof r === 'string' ? r === roleUsuario() : r.NAME === roleUsuario()
  })
  return !!find
}

export default {
  describeUsuario,
  roleUsuario,
  validateRole,
}
