import { getModule } from 'providers/hoc'

const route = store => ({
  path: 'profile',

  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Profile'))
    ))
  }
})

export default route
