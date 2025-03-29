import {EVENT_MESSAGE_USER} from '../libs/battleship/events/events'
import {eventEmitter} from './game/config'
import {startGame} from './game/loop'

try {
  //throw new Error('Test error')
  await startGame()
} catch (error) {
  eventEmitter.emit(EVENT_MESSAGE_USER, {
    message: error.message,
  })
  console.error('Error:', error)
  process.exit(1)
}
