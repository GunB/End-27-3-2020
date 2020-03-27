import React, { Component } from 'react'
import { Layout, List } from 'antd'
import BasicLayout from 'components/LayoutComponents/BasicLayout'
import { Link } from 'react-router-dom'

const { Content } = Layout

class Cover extends Component {
  render() {
    // const { children = null } = this.props
    return (
      <BasicLayout>
        <Content className="container container--y">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit leo justo, consequat
            aliquet erat porttitor ac. Duis blandit convallis turpis, facilisis placerat velit
            eleifend eu. Nam bibendum ante in mauris eleifend ultrices. Quisque interdum nulla id
            augue elementum, efficitur accumsan purus pretium. Integer ac felis dapibus, interdum
            augue at, sodales nisl. Fusce egestas tincidunt purus ut tincidunt. Duis at bibendum
            sem. In aliquet sit amet dui ut fermentum. Proin congue, ante aliquam tempus facilisis,
            urna felis egestas neque, sit amet pharetra nisl elit eget orci. Nulla consequat leo nec
            ex suscipit, eleifend rutrum nulla hendrerit. Mauris faucibus libero nunc, nec imperdiet
            turpis blandit sed. Fusce sit amet accumsan orci. Integer et iaculis felis. Suspendisse
            tempor lacinia lacinia. Maecenas velit nunc, euismod vitae fermentum quis, tempor at
            felis.
          </p>
          <List size="large" bordered>
            <List.Item>
              <Link to="/categorias">Categorias</Link>
            </List.Item>
            <List.Item>
              <Link to="/directorio/0/Otros">Directorio</Link>
            </List.Item>
            <List.Item>
              <Link to="/comercio">Comercio</Link>
            </List.Item>
            <List.Item>
              <Link to="/login">Login</Link>
            </List.Item>
          </List>
        </Content>
      </BasicLayout>
    )
  }
}

export default Cover
