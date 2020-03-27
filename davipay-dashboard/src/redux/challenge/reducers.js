import actions from './actions'

const initialState = [
  {
    id: 108,
    icon: 'xxx',
    name: 'Retos Davipay',
    cycle: 90,
    date_from: '2019-01-28 00:00:00',
    amount: '20000',
    points_for_transaction: 50,
    points_for_amount: 25,
    description: 'Description',
    status: 0,
  },
  {
    id: 2,
    icon: 'xxx',
    name: 'Retos Davipay',
    cycle: 90,
    date_from: '2019-01-28 00:00:00',
    amount: '20000',
    points_for_transaction: 50,
    points_for_amount: 25,
    description: 'Description',
    status: 1,
  },
  {
    id: 3,
    icon: 'xxx',
    name: 'Retos Davipay',
    cycle: 90,
    date_from: '2019-01-28 00:00:00',
    amount: '20000',
    points_for_transaction: 50,
    points_for_amount: 25,
    description: 'Description',
    status: 2,
  },
  {
    id: 88,
    icon: 'xxx',
    name: 'Retos Davipay',
    cycle: 90,
    date_from: '2019-01-28 00:00:00',
    amount: '20000',
    points_for_transaction: 50,
    points_for_amount: 25,
    description: 'Description',
    status: 1,
  },
  {
    id: 11,
    icon: 'xxx',
    name: 'Retos Davipay',
    cycle: 90,
    date_from: '2019-01-28 00:00:00',
    amount: '20000',
    points_for_transaction: 50,
    points_for_amount: 25,
    description: 'Description',
    status: 3,
  },
  {
    id: 20,
    icon: 'xxx',
    name: 'Retos Davipay',
    cycle: 90,
    date_from: '2019-01-28 00:00:00',
    amount: '20000',
    points_for_transaction: 50,
    points_for_amount: 25,
    description: 'Description',
    status: 2,
  },
  {
    icon: 'xxx',
    name: 'Retos Davipay',
    cycle: 90,
    date_from: '2019-01-28 00:00:00',
    amount: '20000',
    points_for_transaction: 50,
    points_for_amount: 25,
    description: 'Description',
  },
  {
    icon: 'xxx',
    name: 'Retos Davipay',
    cycle: 90,
    date_from: '2019-01-28 00:00:00',
    amount: '20000',
    points_for_transaction: 50,
    points_for_amount: 25,
    description: 'Description',
  },
]

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD:
      return [...action.payload]
    case actions.CLEAN:
      return [...initialState]
    default:
      return state
  }
}
