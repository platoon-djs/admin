import React from 'react'
import { AuthWrapper } from 'providers/auth'
import { getModule } from 'providers/hoc'

import Music from './containers/Music'

const route = store => ({
  path: 'music',

  getComponent (location, cb) {
    cb(null, AuthWrapper({
      authSelector: state => state.auth.data,
      authenticatingSelector: state => state.auth.state === 'PENDING',
      LoadingComponent: () => <div>Loading...</div>
    })(Music))
  },

  getIndexRoute (location, cb) {
    require.ensure([], require => cb(null, [{
      component: getModule(require('./containers/Library'))
    }]))
  },

  getChildRoutes (location, cb) {
    require.ensure([], require => cb(null, [{
      path: 'upload',
      component: getModule(require('./containers/Upload'))
    }, {
      path: 'downloads',
      component: getModule(require('./containers/Downloads'))
    }]))
  }

})

export default route

