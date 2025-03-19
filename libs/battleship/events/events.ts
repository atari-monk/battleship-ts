import {State} from '../ai/type/State'

export const EVENT_STATE_CHANGED: unique symbol = Symbol('EVENT_STATE_CHANGED')

export type StateEvents = {
  [EVENT_STATE_CHANGED]: State
}

