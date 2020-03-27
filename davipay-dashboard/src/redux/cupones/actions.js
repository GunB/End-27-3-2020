const actions = {
  LOAD_ASYNC: 'cupones/LOAD_ASYNC',
  LOAD: 'cupones/LOAD',
  CREATE_ASYC: 'cupones/CREATE_ASYNC',
  CREATE: 'cupones/CREATE',
  CLEAN: 'cupones/CLEAN',
}

export const getAsyncCupones = () => {
  return {
    type: actions.LOAD_ASYNC,
  }
}

export const createAsyncCupon = cupon => {
  return {
    type: actions.CREATE_ASYC,
    payload: cupon,
  }
}

export const cleanCupons = () => {
  return {
    type: actions.CLEAN,
  }
}

export default actions
