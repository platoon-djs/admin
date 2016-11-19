import { getModule } from 'providers/hoc'

const route = store => ({
  path: 'login',

  getComponents (loc, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Login'))
    ))
  }
})

export default route

