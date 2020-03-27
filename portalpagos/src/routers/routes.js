import React from 'react'
import Loadable from 'react-loadable'
import Loader from 'components/Common/Loader'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

export const routes = [
  {
    path: '/',
    Component: loadable(() => import('pages/Categorias')),
    exact: true,
  },
  {
    path: '/login',
    Component: loadable(() => import('pages/Private/user/login')),
    exact: true,
  },
  {
    path: '/user/forgot',
    Component: loadable(() => import('pages/Private/user/forgot')),
    exact: true,
  },
  {
    path: '/user/forgot/mensaje',
    Component: loadable(() => import('pages/Private/user/forgot/mensaje')),
    exact: true,
  },
  {
    path: '/user/forgot/new',
    Component: loadable(() => import('pages/Private/user/forgot/new')),
    exact: true,
  },
  {
    path: '/user/forgot/updated',
    Component: loadable(() => import('pages/Private/user/forgot/updated')),
    exact: true,
  },
  {
    path: '/logout',
    Component: loadable(() => import('pages/Private/user/logout')),
    exact: true,
  },
  {
    path: '/categorias',
    Component: loadable(() => import('pages/Categorias')),
    exact: true,
  },
  {
    path: '/resume',
    Component: loadable(() => import('pages/Private/resume')),
    auth: true,
  },
  {
    path: '/transacciones',
    Component: loadable(() => import('pages/Private/transacciones')),
    auth: true,
  },
  {
    path: '/reportes',
    Component: loadable(() => import('pages/Private/reportes')),
    auth: true,
  },
  {
    path: '/cargar_facturas',
    Component: loadable(() => import('pages/Private/cargar_facturas')),
    auth: true,
  },
  {
    path: '/comercios/crear',
    Component: loadable(() => import('pages/Private/comercios/crear')),
    auth: true,
  },
  {
    path: '/directorio/:id/:name',
    Component: loadable(() => import('pages/Directorio')),
    auth: true,
  },
  {
    path: '/comercio/:id/:name',
    Component: loadable(() => import('pages/Commerce/Commerce')),
    auth: true,
  },
  {
    path: '/ticket/comercio/:id',
    Component: loadable(() => import('pages/Commerce/CommercePSE')),
    auth: true,
  },
  {
    path: '/second',
    breadcrumbName: 'second',
  },
]

export default {
  routes,
}
