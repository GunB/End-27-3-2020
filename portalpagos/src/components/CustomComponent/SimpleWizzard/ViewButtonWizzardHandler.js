import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Popconfirm, Button } from 'antd'

@withRouter
export class ViewButtonWizzardHandler extends Component {
  render() {
    const {
      urlBack = '/',
      history,
      onSubmit,
      strNext = 'Continuar',
      strCancel = 'Descartar',
    } = this.props
    return (
      <>
        <hr />
        <div className="text-right float-right">
          <Button.Group size="big">
            <Popconfirm
              title="¿Esta seguro de descartar?"
              onConfirm={() => history.push(urlBack)}
              okText="Si"
              cancelText="No"
            >
              <Button type="link" className="gray mr-3">
                <u>{strCancel}</u>
              </Button>
            </Popconfirm>
            <Button type="primary" onClick={onSubmit}>
              {strNext}
            </Button>
          </Button.Group>
        </div>
      </>
    )
  }
}

export default ViewButtonWizzardHandler
