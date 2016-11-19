import { resource, createAction } from 'providers/redux'

const namespace = 'PROVIDERS/AUTH'

export default resource(namespace, { actions: ['LOGOUT', 'LOGIN', 'SESSION'] })

export const login = createAction(`${namespace}_LOGIN`, credentials => {
  return new Promise(resolve => {
    setTimeout(() => {
      window.localStorage.setItem('id_token', 'random_string_goes_here')
      resolve({
        role: 1,
        user: credentials.username
      })
    }, 1000)
  })
})

export const checkSession = createAction(`${namespace}_SESSION`, () => {
  const idToken = window.localStorage.getItem('id_token')
  if (idToken) { return new Promise(resolve => {
    setTimeout(() => resolve({ role: 1, user: 'max' }), 0)
  }) }
  return new Error('No id token!')
})

export const logout = createAction(`${namespace}_LOGOUT`, () => {
  window.localStorage.removeItem('id_token')
  return {}
})

