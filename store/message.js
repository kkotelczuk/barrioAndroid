import {types} from 'mobx-state-tree'
import {User} from './user'

export const Message = types
  .model('Message', {
    id: types.identifier(types.number),
    author: User,
    content: types.string
  })
