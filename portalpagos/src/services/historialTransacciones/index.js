import { serverResponseExample } from 'utils/serverResponseExample'
import data from 'assets/json/commerce.json'
// import store from 'models/store'

// const data = [{}]

export function LoadAllHistorialTransacciones() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 100)
      if (random > 4) {
        resolve(serverResponseExample(data))
      } else {
        reject(new Error('Emulated request error'))
      }
    })
  })
}

export default {
  LoadAllHistorialTransacciones,
}
