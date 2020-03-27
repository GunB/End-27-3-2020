import React, { Component } from 'react'
import { Layout } from 'antd'
import BasicLayout from 'components/LayoutComponents/BasicLayout'

const { Content } = Layout

class Cover extends Component {
  render() {
    // const { children = null } = this.props
    return (
      <BasicLayout>
        <Content className="container container--y">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit leo justo, consequat
          aliquet erat porttitor ac. Duis blandit convallis turpis, facilisis placerat velit
          eleifend eu. Nam bibendum ante in mauris eleifend ultrices. Quisque interdum nulla id
          augue elementum, efficitur accumsan purus pretium. Integer ac felis dapibus, interdum
          augue at, sodales nisl. Fusce egestas tincidunt purus ut tincidunt. Duis at bibendum sem.
          In aliquet sit amet dui ut fermentum. Proin congue, ante aliquam tempus facilisis, urna
          felis egestas neque, sit amet pharetra nisl elit eget orci. Nulla consequat leo nec ex
          suscipit, eleifend rutrum nulla hendrerit. Mauris faucibus libero nunc, nec imperdiet
          turpis blandit sed. Fusce sit amet accumsan orci. Integer et iaculis felis. Suspendisse
          tempor lacinia lacinia. Maecenas velit nunc, euismod vitae fermentum quis, tempor at
          felis.
        </Content>
      </BasicLayout>
    )
  }
}

export default Cover
