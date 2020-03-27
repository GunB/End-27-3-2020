import endpoints from 'constants/endpoints'
import { publicAxios } from 'services'
import { isEmpty } from 'helpers/isEmpty'

/*eslint no-constant-condition: 0*/

// Moved api call into own function (for easy test swapping)
export function login({ credential, password }) {
  return publicAxios().request({
    method: 'post',
    url: `${endpoints.AUTH.LOGIN}`,
    data: { credential, password },
  })
}

export function loginTest({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 100)
      if (random > 4) {
        resolve({
          data: { token: 'TEST', email, password },
        })
      } else {
        reject(new Error('Emulate token error'))
      }
    })
  })
}

export function verifyAccount({ token, ...data }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //const random = Math.floor(Math.random() * 100)
      if (!isEmpty(token)) {
        resolve({
          data: {
            token,
            ...data,
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
          request: {},
        })
      } else {
        reject(new Error('Emulate token error'))
      }
    })
  })
}

export default {}
