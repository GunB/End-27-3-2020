import moment from 'moment'
import { selectFilter, filterData } from './index'

describe(`Factories::Filter::selectFilter - Generate an AND operation with different types of objects. 
The "filters" object is always a key-value pair`, () => {
  it(`1. Should return comparison (contains) with String case insensitive`, () => {
    expect(selectFilter(data[0].name, 'ToB')).toBe(true)
  })
  it(`2. Should return false if the types don't match`, () => {
    expect(selectFilter(data[0].age, '306')).toBe(false)
  })
  it(`3. Should return comparison with Numbers`, () => {
    expect(selectFilter(data[0].age, 306, true)).toBe(true)
  })
  it(`4. Should return false if the element to compare is empty (String)`, () => {
    expect(selectFilter('', '')).toBe(false)
  })
  it(`5. Should return false if the element to compare is empty (Array)`, () => {
    expect(selectFilter([], [])).toBe(false)
  })
  it(`6. Should return false if the element to compare is empty (Object)`, () => {
    expect(selectFilter({}, {})).toBe(false)
  })
  it(`7. Should return true if the element and the filter are 0 (Number)`, () => {
    expect(selectFilter(0, 0)).toBe(true)
  })
  it(`8. Should compare objects properly`, () => {
    expect(selectFilter(data[0].title, { origin: 'eaRtH' })).toBe(true)
  })
  it(`9. Should reject the entire object if one of the properties in the filter object doesn't exist in the data to filter`, () => {
    expect(selectFilter(data[0].title, { origin: 'eaRtH', gender: false })).toBe(false)
  })
  it(`10. Should compare Dates properly ONLY if the filter object is a moment object`, () => {
    expect(selectFilter(data[0].birthday, moment(0))).toBe(true)
  })
})

describe(`Factories::Filter::filterData - Based on selectFilter's rules, it should filter an array of objects`, () => {
  it(`1. Should return comparison with String case insensitive`, () => {
    expect(filterData(data, { name: 'toBus', title: { origin: 'esHip' } })).toEqual(expected1)
  })
  it(`2. Should return comparison with String case insensitive`, () => {
    expect(filterData(data, { title: { name: 'e' }, professions: ['TAILOR'] })).toEqual(expected2)
  })
})

const data = [
  {
    id: 0,
    married: true,
    name: 'Tobus Quickwhistle',
    thumbnail:
      'http://www.publicdomainpictures.net/pictures/10000/nahled/thinking-monkey-11282237747K8xB.jpg',
    age: 306,
    weight: 39.065952,
    height: 107.75835,
    hair_color: 'Pink',
    birthday: '1970-01-01T00:00:00.000Z',
    title: {
      name: 'Mister',
      origin: 'Earth',
      date: moment(0),
    },
    professions: ['Metalworker', 'Woodcarver', 'Stonecarver', ' Tinker', 'Tailor', 'Potter'],
    friends: ['Cogwitz Chillwidget', 'Tinadette Chillbuster'],
  },
  {
    id: 1,
    name: 'Fizkin Voidbuster',
    thumbnail: 'http://www.publicdomainpictures.net/pictures/120000/nahled/white-hen.jpg',
    age: 288,
    married: false,
    weight: 35.279167,
    height: 110.43628,
    hair_color: 'Green',
    professions: ['Brewer', 'Medic', 'Prospector', 'Gemcutter', 'Mason', 'Tailor'],
    friends: [],
  },
  {
    id: 117,
    name: 'Tobus Quickpiston',
    thumbnail:
      'http://www.publicdomainpictures.net/pictures/20000/nahled/squirrel-in-winter-11298746828jAB.jpg',
    age: 235,
    married: true,
    title: {
      name: 'Mister',
      origin: 'Spaceship',
    },
    weight: 42.93495,
    height: 119.82319,
    hair_color: 'Green',
    professions: ['Cook', 'Tailor'],
    friends: ['Emmadette Voidrocket'],
  },
  {
    id: 729,
    name: 'Tobus Quickrocket',
    thumbnail: 'http://www.publicdomainpictures.net/pictures/10000/velka/1-1248158051Ix2h.jpg',
    age: 88,
    title: {
      origin: 'Spaceship',
      date: '1970-01-01T00:00:00.000Z',
    },
    weight: 41.496223,
    height: 116.17772,
    hair_color: 'Green',
    friends: ['Ecki Felslicer', 'Cogwitz Chillwidget'],
  },
]

const expected1 = [data[2], data[3]]
const expected2 = [data[0], data[2]]
