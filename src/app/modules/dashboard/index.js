import { getModule } from 'providers/hoc'

const route = store => ({
  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Dashboard'))
    ))
  }
})

export default route

