import { getModule } from 'providers/hoc'

const route = store => ({
  path: 'bookings',

  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Bookings'))
    ))
  },

  getIndexRoute (location, cb) {
    require.ensure([], require => cb(null, [{
      component: getModule(require('./containers/List'))
    }]))
  }
})

export default route
