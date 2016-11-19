import { createAction } from 'providers/redux'
import { createSelector } from 'reselect'

const namespace = 'PROVIDERS/PLAYER'
export const mountPoint = 'player'

export const playerSelector = state => state[mountPoint]
export const hasPlayerSelector = createSelector(playerSelector, state => state.active)

const initialState = {
  active: false
}

export default function player (state = initialState, action) {
  if (!action) return state

  switch (action.type) {

    case 'PROVIDERS/AUTH_LOGOUT':
      return Object.assign({}, state, { active: false })

    case `${namespace}_PLAY_TRACK`:
      return Object.assign({}, state, { active: true })

    default:
      return state
  }
}

export const playTrack = createAction(`${namespace}_PLAY_TRACK`)
