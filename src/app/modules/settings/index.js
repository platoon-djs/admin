import { getModule } from 'providers/hoc'

const route = store => ({
  path: 'settings',

  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Settings'))
    ))
  }
})

export default route
