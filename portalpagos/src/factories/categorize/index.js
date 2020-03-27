import { isEmpty } from 'helpers/isEmpty'

export const categorize = (rawData = [], categories = []) => {
  const answer = { 0: [] }

  rawData.forEach(data => {
    const { category } = data
    let wasUsed = false
    categories.forEach(c => {
      const idC = c.id || c.Id || c.ID
      const idCategory = category.id || category.Id || category.ID
      if (idC === idCategory) {
        if (isEmpty(answer[idC])) {
          answer[idC] = []
        }
        answer[idC].push(data)
        wasUsed = true
      }
    })
    if (!wasUsed) {
      answer[0].push(data)
    }
  })
  return answer
}

export default {
  categorize,
}
