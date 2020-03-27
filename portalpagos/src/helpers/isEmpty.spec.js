import { isEmpty } from './isEmpty'

describe(`Helpers::isEmpty - Should return true if the value doesn't have any useful data`, () => {
  it(`1. Should be true if compared to NaN`, () => {
    expect(isEmpty(parseInt('foo', 10))).toEqual(true)
  })
  it(`2. Should be true if compared to empty object`, () => {
    expect(isEmpty({})).toEqual(true)
  })
  it(`3. Should be true if compared to empty array`, () => {
    expect(isEmpty([])).toEqual(true)
  })
  it(`4. Should be true if compared to null`, () => {
    expect(isEmpty(null)).toEqual(true)
  })
  it(`5. Should be true if compared to undefined`, () => {
    expect(isEmpty(undefined)).toEqual(true)
  })
  it(`6. Should be true if compared to an empty string`, () => {
    expect(isEmpty('')).toEqual(true)
  })
  it(`7. Should be false if compared to a number`, () => {
    expect(isEmpty(0)).toEqual(false)
  })
  it(`8. Should be false if compared to an string with an space`, () => {
    expect(isEmpty(' ')).toEqual(false)
  })
  it(`9. Should be false if compared to an array containing an empty array`, () => {
    expect(isEmpty([[]])).toEqual(false)
  })
})
