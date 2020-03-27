import React from 'react'
import { Form, Input, Icon } from 'antd'
import { withTranslation } from 'react-i18next'
import { FILTER } from 'constants/web_workers'
import { postWebWorker, listenerWebWorker } from 'helpers/webWorker'
import FilterWorker from 'factories/filter/index.worker'
import { isEmpty } from 'helpers/isEmpty'
import { connect } from 'react-redux'

let worker = {}

const onChange = (props, filters = {}) => {
  const { callbackFn, rawData } = props
  if (callbackFn && worker) {
    postWebWorker(worker, FILTER.IN, {
      dataSource: rawData,
      filters,
    })
  }
}

const dispatchToProps = (dispatch, props) => ({
  getData: () => {
    const { triggerActions = [] } = props
    if (!isEmpty(triggerActions)) {
      triggerActions.forEach(action => {
        dispatch(action())
      })
    }
  },
})

const stateToProps = (state, props) => ({
  rawData: state[props.storeAttribute],
})

@withTranslation()
@connect(stateToProps, dispatchToProps)
@Form.create({
  onFieldsChange(props, changedFields, allValues) {
    onChange(props, allValues)
  },
})
class DataFilter extends React.Component {
  componentDidMount() {
    worker = new FilterWorker()
    const { getData, callbackFn } = this.props
    getData()
    if (callbackFn) {
      listenerWebWorker(worker, FILTER.OUT, eventData => {
        const { data: filtered } = eventData
        callbackFn(filtered)
      })
    }
  }

  render() {
    const { form, t } = this.props
    return (
      <>
        <Form layout="vertical" autocomplete="off">
          <Form.Item>
            {form.getFieldDecorator('name')(
              <Input
                placeholder={`${t('please type a filter')}`}
                size="default"
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />,
            )}
          </Form.Item>
        </Form>
      </>
    )
  }
}

DataFilter.defaultProps = {
  triggerActions: [],
  storeAttribute: null,
  rawData: [
    /*{
      key: 1,
      type: TYPES[1].key,
      details: 'Todas las tiendas',
      user: 'Monica',
      status: 'in progress',
      start: moment().subtract(1, 'hour'),
      end: moment().add(15, 'minutes'),
    },
    {
      key: 2,
      type: TYPES[2].key,
      details: 'Todas las tiendas',
      user: 'Monica',
      status: 'finished',
      start: moment().subtract(1, 'hour'),
      end: moment(),
    },*/
  ],
}

export default DataFilter
