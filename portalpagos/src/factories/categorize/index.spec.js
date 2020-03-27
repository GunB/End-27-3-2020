import { categorize } from '.'

describe(`Factories::Categorize::categorize - groups data based on categories`, () => {
  it(`1. Should group data based on a given array of category objects`, () => {
    expect(categorize(data, categories)).toEqual(expected1)
  })
  it(`2. Should group data based on a given array of category objects`, () => {
    expect(categorize(data, categories2)).toEqual(expected2)
  })
})

const data = [
  {
    commerce_id: 1,
    city: '',
    image: 'url-imagen',
    public_name: 'Empresa publica taquila basica',
    public_address: 'Calle falsa 123',
    public_phone: '21321321321',
    category: {
      id: 13,
      code: 'medical',
      name: 'Salud y medicina prepagada',
      description: 'Salud y medicina prepagada',
      image: '',
      order: 1,
    },
    ticket_type: {
      id: 2,
      code: 'basic',
      name: 'Taquilla Basica',
      description: 'Taquilla basica',
      image: '',
      order: 1,
    },
    payment_method: [
      {
        id: 4,
        code: 'tdc',
        name: 'Tarjeta de Credito',
        description: 'Tarjeta de Credito',
        image: '',
        order: 1,
      },
      { id: 5, code: 'pse', name: 'PSE', description: 'PSE', image: '', order: 1 },
    ],
    payment_concept: ['Concepto pago 1', 'Concepto pago 2'],
    free_payment_concept: true,
    form_field: { name: 'text', referencia: 'number' },
    status: {
      id: 15,
      code: 'commerce-init',
      name: 'Comercio registrado',
      description: 'Comercio registrado',
      image: '',
      order: 1,
    },
  },
  {
    commerce_id: 2,
    city: '',
    image: 'url-imagen',
    public_name: 'Empresa taquilla Base de dato 2',
    public_address: 'Calle falsa 123',
    public_phone: '21321321321',
    category: {
      id: 11,
      code: 'medical',
      name: 'Salud y medicina prepagada',
      description: 'Salud y medicina prepagada',
      image: '',
      order: 1,
    },
    ticket_type: {
      id: 3,
      code: 'db',
      name: 'Taquilla BD',
      description: 'Taquilla BD',
      image: '',
      order: 1,
    },
    payment_method: [
      {
        id: 4,
        code: 'tdc',
        name: 'Tarjeta de Credito',
        description: 'Tarjeta de Credito',
        image: '',
        order: 1,
      },
      { id: 5, code: 'pse', name: 'PSE', description: 'PSE', image: '', order: 1 },
    ],
    payment_concept: ['Concepto pago 1', 'Concepto pago 2'],
    free_payment_concept: true,
    form_field: null,
    status: {
      id: 15,
      code: 'commerce-init',
      name: 'Comercio registrado',
      description: 'Comercio registrado',
      image: '',
      order: 1,
    },
  },
  {
    commerce_id: 3,
    city: '',
    image: 'url-imagen',
    public_name: 'Empresa publica taquila basica',
    public_address: 'Calle falsa 123',
    public_phone: '21321321321',
    category: {
      id: 13,
      code: 'medical',
      name: 'Salud y medicina prepagada',
      description: 'Salud y medicina prepagada',
      image: '',
      order: 1,
    },
    ticket_type: {
      id: 2,
      code: 'basic',
      name: 'Taquilla Basica',
      description: 'Taquilla basica',
      image: '',
      order: 1,
    },
    payment_method: [
      {
        id: 4,
        code: 'tdc',
        name: 'Tarjeta de Credito',
        description: 'Tarjeta de Credito',
        image: '',
        order: 1,
      },
      { id: 5, code: 'pse', name: 'PSE', description: 'PSE', image: '', order: 1 },
    ],
    payment_concept: ['Concepto pago 1', 'Concepto pago 2'],
    free_payment_concept: true,
    form_field: { name: 'text', referencia: 'number' },
    status: {
      id: 15,
      code: 'commerce-init',
      name: 'Comercio registrado',
      description: 'Comercio registrado',
      image: '',
      order: 1,
    },
  },
  {
    commerce_id: 4,
    city: '',
    image: 'url-imagen',
    public_name: 'Empresa taquilla Base de dato 2',
    public_address: 'Calle falsa 123',
    public_phone: '21321321321',
    category: {
      id: 2,
      code: 'medical',
      name: 'Salud y medicina prepagada',
      description: 'Salud y medicina prepagada',
      image: '',
      order: 1,
    },
    ticket_type: {
      id: 3,
      code: 'db',
      name: 'Taquilla BD',
      description: 'Taquilla BD',
      image: '',
      order: 1,
    },
    payment_method: [
      {
        id: 4,
        code: 'tdc',
        name: 'Tarjeta de Credito',
        description: 'Tarjeta de Credito',
        image: '',
        order: 1,
      },
      { id: 5, code: 'pse', name: 'PSE', description: 'PSE', image: '', order: 1 },
    ],
    payment_concept: ['Concepto pago 1', 'Concepto pago 2'],
    free_payment_concept: true,
    form_field: null,
    status: {
      id: 15,
      code: 'commerce-init',
      name: 'Comercio registrado',
      description: 'Comercio registrado',
      image: '',
      order: 1,
    },
  },
]
const categories = [
  {
    ID: 13,
    CreatedAt: '2020-02-19T23:54:40Z',
    UpdatedAt: '0001-01-01T00:00:00Z',
    DeletedAt: null,
    code: 'medical',
    type: 'category',
    name: 'Salud y medicina prepagada',
    description: 'Salud y medicina prepagada',
    order: 1,
    image: '',
    status: 1,
  },
]
const categories2 = [
  {
    ID: 13,
    CreatedAt: '2020-02-19T23:54:40Z',
    UpdatedAt: '0001-01-01T00:00:00Z',
    DeletedAt: null,
    code: 'medical',
    type: 'category',
    name: 'Salud y medicina prepagada',
    description: 'Salud y medicina prepagada',
    order: 1,
    image: '',
    status: 1,
  },
  { Id: 2 },
]
const expected1 = {
  0: [data[1], data[3]],
  13: [data[0], data[2]],
}
const expected2 = {
  0: [data[1]],
  13: [data[0], data[2]],
  2: [data[3]],
}
