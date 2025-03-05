import { PLAYER } from './type/PLAYER'
import { printGameState } from './render'
import { config } from './config'
import { attack, tooglePlayers } from './logic'
import { waitForButtonClick } from './input'

export async function startGame() {
  let isGameOver = false
  let attacker = config.players.get(PLAYER.PLAYER2)!
  let defender = config.players.get(PLAYER.PLAYER1)!

  while (!isGameOver) {
    printGameState(defender.role, config)

    await attack(attacker, defender)

    isGameOver = defender.grid.isGameOver()

    printGameState(defender.role, config)

    if (isGameOver) {
      console.log('Game over! All ships have been sunk.')
      break
    }

    await waitForButtonClick('continueButton')
    //;[attacker, defender] = tooglePlayers(attacker, defender)
  }
}
