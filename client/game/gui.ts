import {EventEmitter} from '@atari-monk/event-emitter'
import {MessageBoxComponent} from '../../libs/gui'
import {Events} from '../../libs/battleship/events/events'

export function setupGUI(eventEmitter: EventEmitter<Events>) {
  new MessageBoxComponent(eventEmitter)
}
