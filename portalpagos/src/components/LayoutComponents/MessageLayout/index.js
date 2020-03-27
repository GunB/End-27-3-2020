import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Icon, Row, Col, Button } from 'antd'
import T from 'components/SystemComponent/T'
import SITE_MESSAGE from 'constants/site_message'
import i18next from 'i18next'

@connect(({ config }) => ({ config }))
class MessageLayout extends Component {
  state = {
    userInteraction: {
      closeModal: false,
    },
  }

  componentDidUpdate(prevProps) {
    const {
      config: { loading: prevLoading },
    } = prevProps
    const {
      config: { loading: newLoading },
    } = this.props
    if (prevLoading !== newLoading && newLoading === true) {
      this.toggleModal(false)
    }
  }

  toggleModal = (reset = undefined) => {
    this.setState(({ userInteraction: { closeModal } }) => ({
      userInteraction: { closeModal: reset === undefined ? !closeModal : reset },
    }))
  }

  render() {
    const {
      config: { message },
      config,
      children = null,
    } = this.props

    const {
      userInteraction: { closeModal },
    } = this.state

    const allErrors = Object.keys(SITE_MESSAGE.TYPE.ERROR).map(
      type => SITE_MESSAGE.TYPE.ERROR[type],
    )

    const allWarnings = Object.keys(SITE_MESSAGE.TYPE.WARNING).map(
      type => SITE_MESSAGE.TYPE.ERROR[type],
    )

    const visible =
      !config.loading &&
      message.style !== SITE_MESSAGE.STYLE.NONE &&
      !closeModal &&
      message.title &&
      allErrors.includes(message.type) &&
      allWarnings.includes(message.type)

    return (
      <>
        <div>
          <Modal
            closable
            centered
            visible={visible}
            onCancel={this.toggleModal}
            onOk={this.toggleModal}
            footer={[
              <Button key="submit" type="primary" onClick={this.toggleModal}>
                Continuar
              </Button>,
            ]}
            title={
              <Row type="flex" align="middle">
                <Col>
                  <h2 className="mb-0">
                    {i18next.exists(`${message.type}${message.title}-title`) ? (
                      <T>
                        {message.type}
                        {message.title}-title
                      </T>
                    ) : (
                      <T>{message.type}</T>
                    )}
                  </h2>
                </Col>
              </Row>
            }
          >
            <Row type="flex" align="middle">
              <Col xs={3}>
                <Icon type="info-circle" style={{ fontSize: '35px', color: '#f39834' }} />
              </Col>
              <Col xs={21}>
                <T>
                  {message.type}
                  {message.title}
                </T>
              </Col>
            </Row>
          </Modal>
        </div>
        {children}
      </>
    )
  }
}

export default MessageLayout
