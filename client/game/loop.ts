import { PLAYER } from './type/PLAYER'
import { printGameState } from './render'
import { config } from './config'
import { attack, tooglePlayers } from './logic'

export async function startGame() {
  const player1 = config.players.get(PLAYER.PLAYER1)!
  const player2 = config.players.get(PLAYER.PLAYER2)!
  if (!player1 || !player2) throw new Error('Missing Player')
  let isGameOver = false

  let attacker = player1
  let defender = player2

  while (!isGameOver) {
    printGameState(defender.role, config)
    await attack(attacker, defender)
    isGameOver = defender.grid.isGameOver()
    printGameState(defender.role, config)
    if (isGameOver) {
      console.log('Game over! All ships have been sunk.')
      break
    }
    ;[attacker, defender] = tooglePlayers(attacker, defender)
  }
}
