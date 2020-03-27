import React from 'react'
import { Popover, Icon } from 'antd'

const GenericLabel = ({ title, content }) => {
  return (
    <span>
      {`${title}`}&nbsp;
      <Popover
        content={
          <div>
            <p>{content}</p>
          </div>
        }
        title={<h5>{`${title}`}</h5>}
      >
        <Icon type="question-circle" theme="filled" style={{ color: '#DEDEE9' }} />
      </Popover>
    </span>
  )
}

export default GenericLabel
