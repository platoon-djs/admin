import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'

import { PENDING, RESOLVED, REJECTED } from './constants'

const isPromise = value => isObject(value) && isFunction(value.then)

export default function promiseMiddleware ({ dispatch }) {
  return next => action => {
    if (!isPromise(action.payload)) {
      return next(action)
    }

    const { type, payload, meta } = action

    const getAction = (newPayload, isRejected) => ({
      type: `${type}_${isRejected ? REJECTED : RESOLVED}`,
      ...((newPayload === null || typeof newPayload === 'undefined') ? {} : {
        payload: newPayload
      }),
      ...(!!meta ? { meta } : {}),
      ...(isRejected ? {
        error: true
      } : {})
    })

    next({
      type: `${type}_${PENDING}`,
      ...(!!meta ? { meta } : {})
    })

    return action.payload.then((value = null) => {
      dispatch(getAction(value, false))
      return value
    }, reason => {
      dispatch(getAction(reason, true))
      throw reason
    })
  }
}

