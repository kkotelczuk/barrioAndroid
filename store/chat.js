import {types, getRoot, flow} from 'mobx-state-tree'
import {IStore} from '.'
import {syncano} from '../utils'
import {User} from './user'
import {Message} from './message'

export const Chat = types
  .model('Chat', {
    id: types.identifier(types.number),
    author: User,
    name: types.string,
    messages: types.optional(types.array(Message), [])
  })
  .views(self => ({
    get QR() {
      return `https://barrio.syncano.space/api/chat-qr/?chatId=${self.id}`
    },
    get url() {
      return {
        single: `/chats/${self.id}`,
        share: `/chats/${self.id}/share`
      }
    },
  }))

export const ChatStore = types
  .model('ChatStore', {
    selected: types.maybe(types.number),
    items: types.optional(types.array(Chat), []),
    pending: types.optional(types.map(types.string), {}),
    isFollowingMessages: types.optional(types.boolean, true)
  })
  .views(self => ({
    get chat() {
      return self.selected ? self.items.find(item => item.id === self.selected) : null
    }
  }))
  .actions(self => ({
    followMessages(value) {
      self.isFollowingMessages = value
    },
    joinChat: flow(function * (id) {
      const chatId = parseInt(id, 10)

      try {
        self.pending.set('join-chat', '')
        const chat = yield syncano('api/join-chat', {chatId})
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('join-chat')
      }
    }),
    selectChat: flow(function * (id) {
      const chatId = parseInt(id, 10)

      if (self.items.find(item => item.id === chatId)) {
        self.selected = chatId

        return
      }

      try {
        self.pending.set('fetch-chat', '')
        const chat = yield syncano('api/get-chat', {chatId})
        self.items.push(chat)
        self.selected = chat.id
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('fetch-chat')
      }
    }),
    fetch: flow(function * (token) {
      try {
        self.pending.set('fetch', '')
        self.items = yield syncano(token)('api/list-chat/')
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('fetch')
      }
    }),
    fetchMessages: flow (function * (id, token) {
      const chatId = parseInt(id, 10)

      try {
        self.pending.set('fetch-messages', '')
        const messages = yield syncano(token)('api/get-chat-messages/', {chatId})
        self.items.replace(self.items.map(chat => chat.id === chatId ? {
          ...chat,
          messages
        } : chat))
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('fetch-messages')
      }
    }),
    createMessage: flow (function * (params) {
      const {chatId, content} = params

      try {
        self.pending.set('create-message', '')

        const message = yield syncano('api/create-chat-message', {chatId, content})

        self.items.forEach(chat => {
          if (chat.id === chatId) {
            chat.messages.push(message)
          }
        })
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('create-message')
      }
    }),
  }))

