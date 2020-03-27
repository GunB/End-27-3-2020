import React from 'react'
import JSONPretty from 'react-json-pretty'
import { PROCESS_ENV } from 'constant/base'
import { Collapse } from 'antd'

const JSONPrettyMon = require('react-json-pretty/dist/monikai')

const JsonTesting = ({ dataSource }) => {
  return (
    <>
      {PROCESS_ENV === 'development' ? (
        <>
          <Collapse bordered={false} className="mb-5">
            <Collapse.Panel header={`Datos solo visibles en modo ${PROCESS_ENV}`} key="1">
              <JSONPretty data={dataSource} theme={JSONPrettyMon} />
              {console.warn('JsonTesting', dataSource)}
            </Collapse.Panel>
          </Collapse>
        </>
      ) : null}
      <div />
    </>
  )
}

export default JsonTesting
