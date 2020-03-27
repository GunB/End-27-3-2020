import _ from 'lodash'
import { isEmpty } from 'helpers/isEmpty'
import moment from 'moment'

export const filterBoolean = (element, filter) => element && filter

export const filterNumber = (element, filter) => element === filter

export const filterDates = (element, filter) => {
  return moment(element).isSame(filter)
}

export const filterString = (element, filter) =>
  element
    .toLowerCase()
    .trim()
    .includes(filter.toLowerCase().trim())

export const filterArray = (element = [], filter = []) =>
  filter.every(f => element.find(e => selectFilter(e, f)))

export const filterSimpleObject = (element = {}, filter = {}) => {
  const kf = Object.keys(filter)
  const ke = Object.keys(element)
  return kf.every(f => ke.find(e => selectFilter(element[e], filter[f])))
}

export const selectFilter = (element, filter) => {
  if (!isEmpty(element)) {
    if (_.isString(element) && _.isString(filter)) {
      return filterString(element, filter)
    }
    if (_.isNumber(element) && _.isNumber(filter)) {
      return filterNumber(element, filter)
    }
    if (_.isArray(element) && _.isArray(filter)) {
      return filterArray(element, filter)
    }
    if (filter instanceof moment && moment(element).isValid()) {
      return filterDates(element, filter)
    }
    if (_.isObject(element) && _.isObject(filter)) {
      return filterSimpleObject(element, filter)
    }
    if (_.isBoolean(element) && _.isBoolean(filter)) {
      return filterBoolean(element, filter)
    }
    return false
  }
  return false
}

export const verifyAllData = (element = {}, filters = {}) =>
  Object.keys(filters).every(f => isEmpty(filters[f]) || selectFilter(element[f], filters[f]))

export const filterData = (rawData = [], filters = {}) => {
  if (isEmpty(filters)) {
    return rawData
  }
  return rawData.filter(data => verifyAllData(data, filters))
}

export default {
  filterArray,
  filterBoolean,
  filterNumber,
  filterString,
  filterSimpleObject,
  selectFilter,
  verifyAllData,
  filterData,
}
