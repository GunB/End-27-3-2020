import React from 'react'
import { Row, Col, List } from 'antd'
import { Link } from 'react-router-dom'

const ListCommerce = ({ dataSource = [], pageRoute }) => {
  let letter = null
  return (
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 10]} className="container--y">
      {dataSource.map(data => {
        const firstLetter = data.public_name.toLowerCase().substring(0, 1)
        let letterStart = null
        if (letter !== firstLetter) {
          letter = firstLetter
          letterStart = (
            <Col xs={24}>
              <h2>
                <b>{letter.toUpperCase()}</b>
              </h2>
            </Col>
          )
        } else {
          letterStart = null
        }
        return (
          <React.Fragment key={data.commerce_id}>
            {letterStart}
            <Col md={12} lg={14} xl={14} key={data.commerce_id}>
              <List.Item className="directory__list">
                <List.Item.Meta
                  title={
                    <Link to={`${pageRoute}/${data.commerce_id}/${data.public_name}`}>
                      {data.public_name}
                    </Link>
                  }
                />
                <p className="fc-lightGray reset-margin">{data.city}</p>
              </List.Item>
            </Col>
          </React.Fragment>
        )
      })}
    </Row>
  )
}

export default ListCommerce
