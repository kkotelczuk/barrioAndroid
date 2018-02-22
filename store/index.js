import {types} from 'mobx-state-tree'
import {syncano} from '../utils'
// import {FormStore, Form} from './form'
import {User, UserStore} from './user'
// import {Modal} from './modal'
import {ChatStore} from './chat'

export const Store = types
  .model('Store', {
    // modal: types.optional(Modal, {}),
    chatStore: types.optional(ChatStore, {}),
    userStore: types.optional(UserStore, {}),
    // formStore: types.optional(FormStore, {})
  })
