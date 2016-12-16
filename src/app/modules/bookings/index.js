import { getModule, getRoute } from 'providers/hoc'

const route = store => ({
  path: 'bookings',

  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Bookings'))
    ))
  },

  getChildRoutes (location, cb) {
    require.ensure([], require => cb(null, [{
      path: 'create',
      component: getModule(require('./containers/Create'))
    }]))
  },

  getIndexRoute (location, cb) {
    require.ensure([], require => cb(null, [{
      component: getModule(require('./containers/List'))
    }]))
  }
})

export default route
