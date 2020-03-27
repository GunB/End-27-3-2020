import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'

import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'
import RouterAuth from 'routerAuth'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/user/login')),
    exact: true,
  },
  {
    path: '/logout',
    component: loadable(() => import('pages/user/logout')),
    exact: true,
  },
  {
    path: '/user/forgot',
    component: loadable(() => import('pages/user/forgot')),
    exact: true,
  },
  {
    path: '/user/resetPassword/:token',
    component: loadable(() => import('pages/user/resetPassword')),
    exact: true,
  },

  // Dashboards
  {
    path: '/dashboard/cupon',
    component: loadable(() => import('pages/dashboard/cupon')),
  },
  {
    path: '/dashboard/nuevocupon',
    component: loadable(() => import('pages/cupones/wizzardcupon/index')),
  },
  {
    path: '/dashboard/editarcupon/:code/:id',
    component: loadable(() => import('pages/cupones/wizzardcupon/index')),
  },
  {
    path: '/dashboard/activarcupon/:code/:id',
    component: loadable(() => import('pages/cupones/wizzardcupon/index')),
  },
  {
    path: '/dashboard/detallescupon/:code/:id',
    component: loadable(() => import('pages/cupones/wizzardcupon/index')),
  },
  {
    path: '/dashboard/campania',
    component: loadable(() => import('pages/dashboard/campania')),
    exact: true,
  },
  {
    path: '/dashboard/nuevacampania/:nombreCampaing/:id/:type',
    component: loadable(() => import('pages/cupones/wizzardCampania')),
  },
  {
    path: '/dashboard/retos',
    component: loadable(() => import('pages/dashboard/RetosDashboard')),
    exact: true,
  },
  {
    path: '/dashboard/configuracion_retos/crear_reto',
    component: loadable(() => import('pages/retos/crear')),
    exact: true,
  },
  {
    path: '/dashboard/configuracion_retos/ver_reto/:id',
    component: loadable(() => import('pages/retos/ver')),
    exact: true,
  },
  {
    path: '/dashboard/configuracion_retos',
    component: loadable(() => import('pages/dashboard/RetosDashboardConfig')),
    exact: true,
  },
  {
    path: '/dashboard/crons',
    component: loadable(() => import('pages/dashboard/crons')),
    exact: true,
  },
  {
    path: '/dashboard/reportes',
    component: loadable(() => import('pages/dashboard/reportes')),
    exact: true,
  },
]

class Router extends React.Component {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <RouterAuth />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
