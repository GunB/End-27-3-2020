import React from 'react'
import { Popover, Icon } from 'antd'

const GenericLabel = ({ title, content, ...rest }) => {
  return (
    <span {...rest}>
      {title}{' '}
      <Popover
        content={
          <div>
            <p>{content}</p>
          </div>
        }
        title={title}
      >
        <Icon type="info-circle" style={{ color: '#fe200f' }} />
      </Popover>
    </span>
  )
}

export default GenericLabel
