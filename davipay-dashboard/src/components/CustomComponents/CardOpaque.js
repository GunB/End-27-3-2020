import React from 'react'
import { Card } from 'antd'
import Color from 'color'

const CardOpaque = ({ children = null, ...props }) => {
  return (
    <Card
      {...props}
      style={{
        background: Color('#D2D8E5')
          .fade(0.8)
          .string(),
      }}
    >
      {children}
    </Card>
  )
}

export default CardOpaque
