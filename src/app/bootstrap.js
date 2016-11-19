import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import { promiseMiddleware } from 'providers/redux'
import { authReducer, checkSession } from 'providers/auth'
import { getRoute } from 'providers/hoc'
import { playerReducer, Player } from 'providers/player'

const Root = ({ children, location }) => (
  <div>
    { children }
    <Player />
  </div>
)

const rootRoute = store => ({

  getComponents (state, cb) {
    cb(null, Root)
  },

  getChildRoutes (location, cb) {
    require.ensure([], require => cb(null, [
      getRoute(store, require('modules/admin')),
      getRoute(store, require('modules/music')),
      getRoute(store, require('modules/login')),
      getRoute(store, require('modules/logout'))
    ]))
  }
})

const reducers = combineReducers({
  auth: authReducer,
  player: playerReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(promiseMiddleware)
))

store.dispatch(checkSession())

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={rootRoute(store)} />
  </Provider>,
  document.querySelector('#app')
)

