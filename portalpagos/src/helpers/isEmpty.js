import _ from 'lodash'

export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    _.isNaN(value) ||
    // (_.isNumber(value) && !value) ||
    (_.isBoolean(value) && value !== true && value !== false) ||
    (!_.isNumber(value) && !_.isBoolean(value) && _.isEmpty(value))
  )
}

export default {
  isEmpty,
}
