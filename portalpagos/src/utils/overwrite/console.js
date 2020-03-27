import { isEnvDevelopment } from 'helpers/isEnvDevelopment'

// define a new console
const console = (oldCons => {
  return {
    log: (...args) => {
      if (isEnvDevelopment()) {
        oldCons.log(...args)
      }
    },
    info: (...args) => {
      if (isEnvDevelopment()) {
        oldCons.info(...args)
      }
    },
    warn: (...args) => {
      if (isEnvDevelopment()) {
        oldCons.warn(...args)
      }
    },
    error: (...args) => {
      if (isEnvDevelopment()) {
        oldCons.error(...args)
      }
    },
  }
})(window.console)

export const redefineConsole = () => {
  if (!isEnvDevelopment()) {
    window.console = console
  }
}

export default {
  redefineConsole,
  console,
}
