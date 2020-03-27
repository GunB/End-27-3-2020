const actions = {
  SET: 'config/SET',
  LOADING: 'config/LOADING',
}

export const ACTION_configSet = data => ({
  type: actions.SET,
  payload: data,
})

export const ACTION_configLoading = ({ loading = true, message = {} } = {}) => {
  return {
    type: actions.LOADING,
    payload: {
      loading,
      message,
    },
  }
}

export default actions
