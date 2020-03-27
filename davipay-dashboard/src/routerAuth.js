import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { describeUsuario } from 'factories/user'

class RouterAuth extends Component {
  state = {}

  render() {
    const user = describeUsuario()
    return <Redirect to={user.DEFAULT_ROUTE} />
  }
}

export default RouterAuth
