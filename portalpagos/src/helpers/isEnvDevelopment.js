import { ENVIROMENT } from 'constants/base'

export const isEnvDevelopment = () => ENVIROMENT === 'development' || ENVIROMENT === 'dev'

export default {
  isEnvDevelopment,
}
