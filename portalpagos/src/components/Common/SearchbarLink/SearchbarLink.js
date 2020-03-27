import React, { Component } from 'react'
import { Icon, Input, AutoComplete } from 'antd'
import { selectFilter } from 'factories/filter'
import { withRouter } from 'react-router-dom'

@withRouter
class SearchbarLink extends Component {
  render() {
    const { Option } = AutoComplete
    const { dataSource, pageRoute, placeholder, size = 'large' } = this.props

    const options = dataSource.map(data => {
      const text = `${data.commerce_id} - ${data.public_name}`
      return (
        <Option
          key={data.commerce_id}
          value={`${data.commerce_id}`}
          text={text}
          className="searchbar__link"
        >
          <span to={`${pageRoute}/${data.commerce_id}/${data.public_name}`}>{text}</span>
        </Option>
      )
    })

    return (
      <>
        <AutoComplete
          className="searchbar"
          dropdownClassName="searchbar__dropdown"
          dropdownMatchSelectWidth
          size={size}
          style={{ width: '100%' }}
          dataSource={options}
          placeholder={placeholder}
          optionLabelProp="text"
          filterOption={(input, option) => {
            const { children } = option.props
            return selectFilter(children.props.children, input)
          }}
          onSelect={(value, option) => {
            const { to } = option.props.children.props
            const { history } = this.props
            console.log(value, option, to)
            history.push(to)
          }}
        >
          <Input suffix={<Icon type="search" />} />
        </AutoComplete>
      </>
    )
  }
}

SearchbarLink.defaultProps = {
  pageRoute: '/pageroute',
  placeholder: 'Buscar',
  dataSource: [],
}

export default SearchbarLink
