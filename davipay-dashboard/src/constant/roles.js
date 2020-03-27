const NO_MENU = [
  {
    title: 'Cerrar sesión',
    key: 'cerrarSesion',
    url: '/logout',
    icon: 'icmn icmn-arrow-left2 utils__spin-delayed--pseudo-selector',
  },
]
const DEFAULT_MENU = [
  {
    title: 'Cupones',
    key: 'cupones',
    url: '/dashboard/cupon',
    icon: 'icmn icmn-ticket utils__spin-delayed--pseudo-selector',
  },
  {
    title: 'Campañas (push)',
    key: 'campañas',
    url: '/dashboard/campania',
    icon: 'icmn icmn-bubble utils__spin-delayed--pseudo-selector',
  },
]

const TEMP_MENUS = [
  {
    title: 'Actualizar',
    key: 'crons',
    url: '/dashboard/crons',
    icon: 'icmn icmn-loop2 utils__spin-delayed--pseudo-selector',
  },
  {
    title: 'Reportes',
    key: 'reports',
    url: '/dashboard/reportes',
    icon: 'icmn icmn-file-text2 utils__spin-delayed--pseudo-selector',
  },
]

const RETOS_MENUS = [
  {
    title: 'Programa de lealtad',
    key: 'retos',
    icon: 'icmn icmn-checkbox-checked utils__spin-delayed--pseudo-selector',
    children: [
      {
        title: 'Retos DaviPay',
        key: 'retosDavipay',
        url: '/dashboard/retos',
        icon: 'icmn icmn-checkbox-checked utils__spin-delayed--pseudo-selector',
      },
      {
        title: 'Configuracion',
        key: 'configuracionRetosDavipay',
        url: '/dashboard/configuracion_retos',
        icon: 'icmn icmn-checkbox-checked utils__spin-delayed--pseudo-selector',
      },
    ],
  },
]

const SUPERADMIN = {
  ID: [2, '2'],
  NAME: 'Admin General',
  MENU: async () => {
    return [...DEFAULT_MENU, ...RETOS_MENUS, ...TEMP_MENUS, ...NO_MENU]
  },
  DEFAULT_ROUTE: DEFAULT_MENU[0].url,
}

const BONOS_ADMIN = {
  ID: [0, '0'],
  NAME: 'Administrador de Bonos',
  MENU: async () => {
    return [...DEFAULT_MENU, ...NO_MENU]
  },
  DEFAULT_ROUTE: DEFAULT_MENU[0].url,
}

const BONOS_ANALIST = {
  ID: [1, '1'],
  NAME: 'Analista de Bonos',
  MENU: async () => {
    return [...DEFAULT_MENU, ...NO_MENU]
  },
  DEFAULT_ROUTE: DEFAULT_MENU[0].url,
}

const RETOS_ADMIN = {
  ID: [3, '3'],
  NAME: 'Administrador de Retos',
  MENU: async () => {
    return [...RETOS_MENUS, ...NO_MENU]
  },
  DEFAULT_ROUTE: RETOS_MENUS[0].url,
}

const RETOS_ANALIST = {
  ID: [4, '4'],
  NAME: 'Analista de Retos',
  MENU: async () => {
    return [...RETOS_MENUS, ...NO_MENU]
  },
  DEFAULT_ROUTE: RETOS_MENUS[0].url,
}

export const NONE = {
  ID: [null],
  NAME: 'Sin permisos',
  MENU: async () => {
    return NO_MENU
  },
  DEFAULT_ROUTE: NO_MENU[0].url,
}

export default {
  SUPERADMIN,
  BONOS_ADMIN,
  BONOS_ANALIST,
  RETOS_ADMIN,
  RETOS_ANALIST,
}
