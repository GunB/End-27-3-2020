import React from 'react'
import { Spin } from 'antd'

const Loader = ({ spinning = true }) => (
  <div className="container-view full-centering" style={{ position: 'absolute', width: '100%' }}>
    <Spin spinning={spinning} />
  </div>
)

export default Loader
