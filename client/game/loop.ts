import { PLAYER } from './type/PLAYER'
import { printGameState } from './render'
import { config } from './config'
import { attack, tooglePlayers } from './logic'
import { waitForButtonClick } from './input'

export async function startGame() {
  let isGameOver = false
  let attacker = config.players.get(PLAYER.PLAYER1)!
  let defender = config.players.get(PLAYER.PLAYER2)!

  while (!isGameOver) {
    printGameState(defender.role, config)

    await attack(attacker, defender)

    isGameOver = defender.grid.isGameOver()

    printGameState(defender.role, config)

    await waitForButtonClick('continueButton')

    if (isGameOver) {
      console.log('Game over! All ships have been sunk.')
      break
    }

    ;[attacker, defender] = tooglePlayers(attacker, defender)
  }
}
