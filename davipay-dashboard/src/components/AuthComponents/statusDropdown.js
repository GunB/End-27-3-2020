import React, { Component } from 'react'
import { Menu, Icon, Modal, Dropdown, Tag, Button } from 'antd'
import * as uuidv4 from 'uuid/v4'
import { validateRole } from 'factories/user'
import JsonTesting from 'components/CustomComponents/JsonTesting'
import ROLES from '../../constant/roles'

class StatusDropdown extends Component {
  state = {}

  findStatus = (statusList, actions, status) => {
    const currentStatus = statusList.find(item => item.key === status) || {}
    if (currentStatus.showActions) {
      currentStatus.actions = currentStatus.showActions.map(action => ({
        name: action.action,
        content: action.content || action.action,
        action: action.action ? actions[action.action] : null,
      }))
    }
    return currentStatus
  }

  handleMenuClick = e => {
    const { key } = e
    const { actions, dataSource } = this.props
    if (actions[key]) {
      actions[key](dataSource)
    }
  }

  render() {
    const { findStatus } = this
    const { dataSource, roles = [ROLES.SUPERADMIN], statusList, actions } = this.props

    const currentStatus = findStatus(statusList, actions, dataSource.status)
    const roleValidated = !!(validateRole(roles) && currentStatus.actions)

    return (
      <Dropdown
        key={dataSource.key}
        overlay={
          roleValidated ? (
            <Menu onClick={this.handleMenuClick}>
              {currentStatus.actions.map(action =>
                action.action ? (
                  <Menu.Item key={`${action.name}`} value={`${action.name}`}>
                    {action.content}
                  </Menu.Item>
                ) : (
                  React.cloneElement(action.content, {
                    key: uuidv4(),
                  })
                ),
              )}
            </Menu>
          ) : (
            <></>
          )
        }
      >
        <Button type="link" className="px-0">
          <Tag color={currentStatus.color} className="mx-0">
            {currentStatus.name} {roleValidated ? <Icon type="down" /> : null}
          </Tag>
        </Button>
      </Dropdown>
    )
  }
}

StatusDropdown.defaultProps = {
  statusList: [
    {
      name: 'Pendiente',
      color: 'orange',
      key: 0,
      showActions: [
        {
          content: <span>Aprobar</span>,
          action: 'aprobar',
        },
        {
          content: <Menu.Divider />,
        },
        {
          content: (
            <span>
              Eliminar <Icon type="delete" />
            </span>
          ),
          action: 'eliminar',
        },
      ],
    },
    {
      name: 'Aprobado',
      color: 'green',
      key: 1,
      showActions: [
        {
          content: <span>Pausar</span>,
          action: 'pausar',
        },
      ],
    },
    {
      name: 'Pausado',
      color: 'cyan',
      key: 2,
      showActions: [
        {
          content: <span>Reanudar</span>,
          action: 'reanudar',
        },
      ],
    },
    { name: 'En curso', color: 'blue', key: 3 },
  ],
  actions: {
    aprobar: dataSource => {
      Modal.confirm({
        title: 'Desea aprobar?',
        content: <JsonTesting dataSource={dataSource} />,
      })
    },
    pausar: dataSource => {
      Modal.confirm({
        title: 'Desea pausar?',
        content: <JsonTesting dataSource={dataSource} />,
      })
    },
    reanudar: dataSource => {
      Modal.confirm({
        title: 'Desea reanudar?',
        content: <JsonTesting dataSource={dataSource} />,
      })
    },
    eliminar: dataSource => {
      Modal.confirm({
        title: 'Desea eliminar?',
        content: <JsonTesting data={dataSource} />,
      })
    },
  },
}

export default StatusDropdown
