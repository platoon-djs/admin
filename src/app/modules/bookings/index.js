import { getModule } from 'providers/hoc'

const route = store => ({
  path: 'bookings',

  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Bookings'))
    ))
  }
})

export default route
