import { getModule } from 'providers/hoc'

const route = store => ({
  path: 'cms',

  getComponent (location, cb) {
    require.ensure([], require => cb(null,
      getModule(require('./containers/CMS'))
    ))
  }
})

export default route
