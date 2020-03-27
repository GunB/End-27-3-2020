export const postWebWorker = (worker, type, data = undefined) => {
  worker.postMessage({
    SERVICEWORKER_type: type,
    data,
  })
}
export const listenerWebWorker = (worker, type, callback) => {
  worker.addEventListener('message', e => {
    if (!e) return
    const {
      data: { SERVICEWORKER_type },
      data,
    } = e
    if (SERVICEWORKER_type === type) {
      if (callback) {
        callback({ ...data })
      }
    }
  })
}

export default {
  postWebWorker,
  listenerWebWorker,
}
