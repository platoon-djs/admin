import React, { Component, PropTypes as T } from 'react'
import hoistNonStatics from 'hoist-non-react-statics'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

const defaults = {
  LoadingComponent: () => null,
  redirectPath: '/login',
  predicate: user => !isEmpty(user),
  authenticatingSelector: () => false
}

const authDecorator = args => {
  const {
    LoadingComponent,
    redirectPath,
    predicate,
    authSelector,
    authenticatingSelector
  } = {
    ...defaults,
    ...args
  }

  const isAuthorized = data => predicate(data)
  const createRedirect = (location, redirect, path) => {
    const query = {}
    const lastPath = `${location.pathname}${location.search}`
    if (lastPath !== '/') {
      query.redirect = lastPath
    }
    redirect({
      pathname: redirectPath,
      query: query
    })
  }

  const wrapper = DecoratedComponent => {
    const authComponent = class extends Component {
      componentWillMount () {
        if (!this.props.isAuthenticating && !isAuthorized(this.props.authData)) {
          createRedirect(this.props.location, this.context.router.replace, redirectPath)
        }
      }

      componentWillReceiveProps (nextProps) {
        const willBeAuthorized = isAuthorized(nextProps.authData)
        const willBeAuthenticating = nextProps.isAuthenticating
        const wasAuthorized = isAuthorized(this.props)
        const wasAuthenticating = this.props.isAuthenticating

        if (
          (wasAuthorized && !willBeAuthorized) ||
          (wasAuthenticating && !willBeAuthorized)
        ) {
          createRedirect(this.props.location, this.context.router.replace, redirectPath)
        }
      }

      render () {
        const { authData, isAuthenticating, ...otherProps } = this.props

        if (isAuthorized(authData)) {
          return <DecoratedComponent authData={authData} {...otherProps} />
        } else if (isAuthenticating) {
          return <LoadingComponent authData={authData} {...otherProps} />
        }

        return null
      }
    }

    authComponent.contextTypes = {
      router: T.object
    }

    const mapStateToProps = (state, ownProps) => ({
      authData: authSelector(state, ownProps, false),
      isAuthenticating: authenticatingSelector(state, ownProps, false)
    })

    return hoistNonStatics(connect(mapStateToProps)(authComponent), DecoratedComponent)
  }

  return wrapper
}

export default authDecorator

