import { getModule } from 'providers/hoc'

const route = store => ({
  path: 'members',

  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/Members'))
    ))
  }
})

export default route
