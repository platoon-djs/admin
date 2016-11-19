import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import keys from 'lodash/keys'
import assign from 'lodash/assign'

import { PENDING, RESOLVED, REJECTED, ERROR } from './constants'
import { ActionTypes } from './actions'

const stemRe = new RegExp(`_?(${[PENDING, RESOLVED, REJECTED].join('|')})$`)
const stemAction = action => action.type.replace(stemRe, '')

const testAction = suffix => {
  const re = new RegExp(`${suffix}$`, 'i')
  return action => re.test(action.type)
}

const isPending = testAction(PENDING)
const isResolved = testAction(RESOLVED)
const isRejected = testAction(REJECTED)

const resourceFactory = resourceType => (type, config = {}) => {
  const actions = isArray(config.actions)
    ? config.actions
    : keys(ActionTypes)

  const validActions = actions.reduce((acc, at) => assign(acc, {
    [ActionTypes[at] ? ActionTypes[at](type) : `${type}_${at}`]: true
  }), {})

  const initialState = {
    state: null,
    data: resourceType,
    error: null
  }

  const reduce = (state, action) => {
    const out = {}

    if (isPending(action)) out.state = PENDING
    if (isResolved(action)) out.state = RESOLVED
    if (isRejected(action) || action.error) out.state = ERROR

    if (!(action.payload === null || action.payload === undefined)) {
      if (action.error) {
        out.error = action.payload
      } else {
        out.data = action.payload
        out.error = null
      }
    }
    if (!(action.meta === null || action.meta === undefined)) {
      out.meta = action.meta
    }
    return assign({}, state, out)
  }

  return (state = initialState, action) => (
    action && validActions[stemAction(action)]
      ? reduce(state, action)
      : state
  )
}

export const resource = resourceFactory({})
export const resources = resourceFactory([])

