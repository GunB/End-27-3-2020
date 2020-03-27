import React from 'react'
import JSONPretty from 'react-json-pretty'
import { Collapse } from 'antd'
import { ENVIROMENT } from 'constants/base'

const JSONPrettyMon = require('react-json-pretty/dist/monikai')

const JsonTesting = ({ dataSource }) => {
  return (
    <>
      {ENVIROMENT === 'development' ? (
        <>
          <Collapse bordered={false}>
            <Collapse.Panel header={`Datos solo visibles en modo ${ENVIROMENT}`} key="1">
              <JSONPretty data={dataSource} theme={JSONPrettyMon} />
              {console.warn('JsonTesting', dataSource)}
            </Collapse.Panel>
          </Collapse>
        </>
      ) : null}
    </>
  )
}

export default JsonTesting
