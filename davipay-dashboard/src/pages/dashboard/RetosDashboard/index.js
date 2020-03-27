import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import Authorize from 'components/LayoutComponents/Authorize'
import ROLES from '../../../constant/roles'

const mapStateToProps = state => ({
  rawRetos: state.retos,
})

@withRouter
@connect(mapStateToProps)
class RetosDashboard extends React.Component {
  render() {
    return (
      <>
        <Authorize roles={[ROLES.RETOS_ADMIN.NAME, ROLES.RETOS_ANALIST.NAME]} redirect to="/">
          <Helmet title="Retos DaviPay" />
        </Authorize>
      </>
    )
  }
}

export default RetosDashboard
