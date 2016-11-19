import { getModule } from 'providers/hoc'

const route = store => ({
  path: 'documents',

  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Documents'))
    ))
  }
})

export default route
