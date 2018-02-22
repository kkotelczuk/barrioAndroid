import {types, getRoot, flow} from 'mobx-state-tree'
import {syncano} from '../utils'
import {AsyncStorage} from 'react-native'

export const User = types
  .model('User', {
    id: types.identifier(types.number),
    username: types.string,
  })

export const UserStore = types
  .model('UserStore', {
    token: types.optional(types.string, ''),
    profile: types.maybe(User),
    pending: types.optional(types.map(types.string), {})
  })
  .views(self => ({
    get isLoggedIn() {
      return Boolean(self.token && self.profile)
    }
  }))
  .actions(self => ({
    setToken: flow(function * (token= '') {
      self.token = token
      return yield AsyncStorage.setItem('@UserStorage:token', token)
    })
  }))
  .actions(self => ({
    fetchProfile: flow(function * () {
      if (!self.token) {
        return
      }
      try {
        self.pending.set('fetch-profile', '')
        self.profile = yield syncano(self.token)('api/profile/')
      } catch (error) {
        if (error.response.data.message === 'User profile was not found.') {
          self.setToken()
        }
        throw error
      } finally {
        self.pending.delete('fetch-profile')
      }
    }),
  }))
  .actions(self => ({
    afterCreate: flow(function * () {
      try {
        self.token = yield AsyncStorage.getItem('@UserStorage:token')
      } catch (error) {
        // Error retrieving data
      }

      self.fetchProfile()
    }),
    logout() {
      self.setToken()
      self.profile = null
    },
    login: flow(function * (credentials) {
      try {
        self.pending.set('login', '')
        const session = yield syncano(self.token)('user-auth/login/', credentials)
        self.setToken(session.token)
        self.fetchProfile()
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('login')
      }
    }),
    register: flow(function * (credentials) {
      try {
        self.pending.set('register', '')
        const session = yield syncano(self.token)('user-auth/register/', credentials)
        self.setToken(session.token)
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('register')
      }
    })
  }))
