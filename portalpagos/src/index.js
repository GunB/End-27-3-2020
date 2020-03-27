import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'routers/mainRouter'
import './locales'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import frFR from 'antd/es/locale/es_ES'
import { redefineConsole } from 'utils/overwrite/console'
import { store, history } from './models/store'
import * as serviceWorker from './serviceWorker'
import 'bootstrap-css-only/css/bootstrap-grid.css'
import 'assets/styles/index.less'

redefineConsole()

ReactDOM.render(
  <ConfigProvider locale={frFR}>
    <Provider store={store}>
      <Router history={history} />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
