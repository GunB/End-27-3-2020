export const attributeHandler = (object = {}) => {
  return {
    ...object,
    id: object.id || object.ID || object.Id || object.iD,
  }
}

export const attributeHandlerMapper = (array = []) => {
  return array.map(attributeHandler)
}

export default {
  attributeHandler,
  attributeHandlerMapper,
}
