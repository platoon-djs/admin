import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { getModule } from 'providers/hoc'
import { logout } from 'providers/auth'

const Logout = connect(null, { logout })(class extends Component {

  static contextTypes = {
    router: T.object.isRequired
  }

  componentWillMount () {
    this.props.logout()
    this.context.router.replace('/login')
  }

  render () {
    return null
  }

})

const route = store => ({
  path: 'logout',
  component: Logout
})

export default route

