import {PLAYER} from './type/PLAYER'
import {printGameState} from './render'
import {config} from './config'
import {attack, tooglePlayers} from './logic'
import {waitForButtonClick} from './input'
import {BattleshipGridRenderer} from './libs/../../../libs/battleship'

export async function startGame() {
  let isGameOver = false
  let attacker = config.players.get(PLAYER.PLAYER2)!
  let defender = config.players.get(PLAYER.PLAYER1)!
  const renderer = new BattleshipGridRenderer(defender.grid)

  while (!isGameOver) {
    printGameState(defender.role, config, renderer)

    await attack(attacker, defender)

    isGameOver = defender.grid.isGameOver()

    printGameState(defender.role, config, renderer)

    if (isGameOver) {
      console.log('Game over! All ships have been sunk.')
      break
    }

    await waitForButtonClick('continueButton')
    //;[attacker, defender] = tooglePlayers(attacker, defender)
  }
}
