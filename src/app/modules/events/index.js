import { getModule } from 'providers/hoc'

const route = store => ({
  path: 'events',

  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Events'))
    ))
  },

  getIndexRoute (location, cb) {
    require.ensure([], require => cb(null, [{
      component: getModule(require('./containers/Calendar'))
    }]))
  }
})

export default route
