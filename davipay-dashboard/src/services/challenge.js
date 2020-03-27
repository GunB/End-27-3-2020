import Axios from 'axios'
import { message, Modal } from 'antd'
import endPoints from 'constant/endPoints'

export function createChallenge(data) {
  const hide = message.loading('Cargando datos...', 0)
  return new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: `${endPoints.CHALLENGE.CREATE}`,
      data: { ...data },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
      credentials: 'same-origin',
    })
      .then(response => {
        hide()
        resolve(response)
      })
      .catch(error => {
        hide()
        Modal.warning({
          title: 'Los datos no pudieron ser subidos',
          content: 'Porfavor intente nuevamente. No pudimos crear el resgistro en el sistema.',
        })
        reject(error)
      })
  })
}

export function getChallenges() {
  const hide = message.loading('Cargando datos...', 0)
  return new Promise((resolve, reject) => {
    Axios({
      method: 'get',
      url: `${endPoints.CHALLENGE.GET}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
      credentials: 'same-origin',
    })
      .then(response => {
        hide()
        const answer = response.data.data.challenges
        resolve(
          [...answer].sort((a, b) => {
            return b.id - a.id
          }),
        )
      })
      .catch(error => {
        hide()
        Modal.warning({
          title: 'Los datos no pudieron ser obtenidos',
          content: 'Porfavor intente nuevamente.',
        })
        reject(error)
      })
  })
}

export default {
  createChallenge,
}
