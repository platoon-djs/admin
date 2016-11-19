import React from 'react'
import { AuthWrapper } from 'providers/auth'
import { getRoute } from 'providers/hoc'

import Admin from './containers/Admin'

const route = store => ({
  path: '/',

  getComponent (location, cb) {
    cb(null, AuthWrapper({
      authSelector: state => state.auth.data,
      authenticatingSelector: state => state.auth.state === 'PENDING',
      LoadingComponent: () => <div>Loading...</div>
    })(Admin))
  },

  getIndexRoute (location, cb) {
    require.ensure([], require => cb(null, [
      getRoute(store, require('modules/dashboard'))
    ]))
  },

  getChildRoutes (location, cb) {
    require.ensure([], require => cb(null, [
      getRoute(store, require('modules/cms')),
      getRoute(store, require('modules/events')),
      getRoute(store, require('modules/bookings')),
      getRoute(store, require('modules/documents')),
      getRoute(store, require('modules/members')),
      getRoute(store, require('modules/settings')),
      getRoute(store, require('modules/profile'))
    ]))
  }

})

export default route

