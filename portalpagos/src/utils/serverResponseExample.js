/**
 * @data Object with all attributes as example to return from an API
 */
export const serverResponseExample = data => ({
  data: {
    data,
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {},
})

export default {
  serverResponseExample,
}
