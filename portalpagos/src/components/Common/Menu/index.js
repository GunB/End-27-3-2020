import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter, matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'helpers/isEmpty'

@withRouter
@connect(state => ({
  user: state.user.user_data,
}))
class MenuInterpreter extends Component {
  createMenu = (menu = []) => {
    return menu.map(item => {
      if (item.children) {
        return (
          <Menu.SubMenu
            key={JSON.stringify(item.children)}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
            {this.createMenu(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.route}>
          <Link to={item.route}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    })
  }

  selectedKeys = (menu = []) => {
    const { location } = this.props
    let selected = []
    menu.forEach(item => {
      if (item.children) {
        const isSelected = this.selectedKeys(item.children)
        if (!isEmpty(isSelected))
          selected = [...selected, ...isSelected, JSON.stringify(item.children)]
      } else {
        const isSelected = matchPath(location.pathname, { path: item.route })
        if (!isEmpty(isSelected)) selected.push(item.route)
      }
    })
    return selected
  }

  filterMenu = menu => {
    const { user } = this.props
    const roles = []
    if (user.roles) {
      user.roles.forEach(function a(value) {
        roles.push(value.code)
      })
    }
    const menuFiltrado = []
    menu.forEach(item => {
      if (this.contieneRol(roles, item.rol)) {
        const nuevo = item
        if (item.children) {
          const children = []
          item.children.forEach(itemChildren => {
            console.log(itemChildren)
            if (this.contieneRol(roles, itemChildren.rol)) {
              children.push(itemChildren)
            }
          })
          nuevo.children = children
        }
        menuFiltrado.push(nuevo)
      }
    })
    return menuFiltrado
  }

  contieneRol = (rolesUser, rolesMenu) => {
    let valido = false
    rolesUser.forEach(function validar(rolUser) {
      if (rolesMenu.includes(rolUser)) {
        valido = true
      }
    })
    return valido
  }

  render() {
    const { dataSource = [] } = this.props
    const selected = this.selectedKeys(this.filterMenu(dataSource))
    return (
      <Menu defaultOpenKeys={selected} defaultSelectedKeys={selected} mode="inline">
        {this.createMenu(this.filterMenu(dataSource))}
      </Menu>
    )
  }
}

MenuInterpreter.defaultProps = {
  dataSource: [
    {
      name: 'Resumen',
      icon: 'line-chart',
      route: '/resume',
      rol: ['commerce', 'admin'],
    },
    {
      name: 'Transacciones',
      icon: 'unordered-list',
      route: '/transacciones',
      rol: [],
    },
    {
      name: 'Reportes',
      icon: 'layout',
      route: '/reportes',
      rol: [],
    },
    {
      name: 'Comercios',
      icon: 'tag',
      rol: ['admin'],
      children: [
        {
          name: 'Crear comercio',
          icon: 'plus',
          route: '/comercios/crear',
          rol: ['admin'],
        },
        {
          name: 'Configuracion',
          icon: 'setting',
          route: '/configuracion_comercio',
          rol: [],
        },
        {
          name: 'Cargar Facturas',
          icon: 'upload',
          route: '/cargar_facturas',
          rol: ['admin'],
        },
      ],
    },
    {
      name: 'Mi comercio',
      icon: 'tag',
      rol: ['commerce'],
      children: [
        {
          name: 'Cargar Facturas',
          icon: 'upload',
          route: '/cargar_facturas',
          rol: ['commerce'],
        },
        {
          name: 'Otros',
          icon: 'upload',
          route: '/otros',
          rol: [],
        },
        {
          name: 'Configuracion',
          icon: 'setting',
          route: '/configuracion_comercio',
          rol: [],
        },
      ],
    },
    {
      name: 'Mensajes',
      icon: 'message',
      route: '/mensajes',
      rol: [],
    },
  ],
}

export default MenuInterpreter
