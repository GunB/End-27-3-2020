import { isEmpty } from 'helpers/isEmpty'

export const mergeAttribute = (dataSource = [], attribute = '') => {
  const answer = {}
  dataSource.forEach(data => {
    if (!isEmpty(data) && !isEmpty(data[attribute])) {
      answer[data[attribute]] = true
    }
  })
  return Object.keys(answer)
}

export default {
  mergeAttribute,
}
