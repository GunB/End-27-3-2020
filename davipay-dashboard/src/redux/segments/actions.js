const actions = {
  LOAD_ASYNC: 'segments/LOAD_ASYNC',
  LOAD: 'segments/LOAD',
  CLEAN: 'segments/CLEAN',
}

export const getAsyncSegments = () => {
  return {
    type: actions.LOAD_ASYNC,
  }
}

export const cleanSegments = () => {
  return {
    type: actions.CLEAN,
  }
}

export default actions
