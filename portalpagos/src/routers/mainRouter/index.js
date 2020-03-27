import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Helmet } from 'react-helmet'
import { SITE_NAME, RECAPTCHA_KEY } from 'constants/base'
import { routes } from 'routers/routes'
import MainSwitcher from 'routers/mainSwitcher'
import DefaultRouter from 'routers/defaultRouter'
import MessageLayout from 'components/LayoutComponents/MessageLayout'
import { loadReCaptcha } from 'react-recaptcha-v3'

class Router extends React.Component {
  componentDidMount() {
    loadReCaptcha(RECAPTCHA_KEY)
  }

  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <Helmet titleTemplate={`${SITE_NAME} | %s`} title="Index" />
        <MessageLayout>
          <DefaultRouter>
            <MainSwitcher switcherData={{ routes }} />
          </DefaultRouter>
        </MessageLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
