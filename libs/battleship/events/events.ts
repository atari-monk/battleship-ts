import {State} from '../ai/type/State'

export const EVENT_STATE_CHANGED: unique symbol = Symbol('EVENT_STATE_CHANGED')
export const EVENT_MESSAGE_USER: unique symbol = Symbol('EVENT_MESSAGE_USER')

export type Events = {
  [EVENT_STATE_CHANGED]: State
  [EVENT_MESSAGE_USER]: {message: string}
}
