const actions = {
  LOAD_ASYNC: 'challenge/LOAD_ASYNC',
  LOAD: 'challenge/LOAD',
  CREATE_ASYC: 'challenge/CREATE_ASYNC',
  CREATE: 'challenge/CREATE',
  CLEAN: 'challenge/CLEAN',
}

export const getAsyncChallenges = () => {
  return {
    type: actions.LOAD_ASYNC,
  }
}

export const createAsyncChallenge = Challenge => {
  return {
    type: actions.CREATE_ASYC,
    payload: Challenge,
  }
}

export const cleanChallenges = () => {
  return {
    type: actions.CLEAN,
  }
}

export default actions
