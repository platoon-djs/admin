import identity from 'lodash/identity'
import isFunction from 'lodash/isFunction'

export const ActionTypes = {
  GET: type => `${type}_GET`,
  POST: type => `${type}_POST`,
  DELETE: type => `${type}_DELETE`,
  UPDATE: type => `${type}_UPDATE`
}

export const createAction = (type, payloadCreator, metaCreator) => {
  const getPayload = isFunction(payloadCreator)
    ? payloadCreator
    : identity

  const actionCreator = (...args) => {
    const hasError = args[0] instanceof Error
    const action = { type }

    const payload = hasError ? args[0] : getPayload(...args)

    if (!(payload === null || payload === undefined)) {
      action.payload = payload
    }

    if (hasError || payload instanceof Error) {
      action.error = true
    }

    if (isFunction(metaCreator)) {
      action.meta = metaCreator(...args)
    }

    return action
  }

  actionCreator.toString = () => type.toString()

  return actionCreator
}

export const createActionGet = (type, ...args) => createAction(ActionTypes.GET(type), ...args)
export const createActionPost = (type, ...args) => createAction(ActionTypes.POST(type), ...args)
export const createActionDelete = (type, ...args) => createAction(ActionTypes.DELETE(type), ...args)
export const createActionUpdate = (type, ...args) => createAction(ActionTypes.UPDATE(type), ...args)

