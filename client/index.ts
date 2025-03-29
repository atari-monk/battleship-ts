import {startGame} from './game/loop'

try {  
  await startGame()
} catch (error) {
  console.error('Error:', error)
  process.exit(1)
}
