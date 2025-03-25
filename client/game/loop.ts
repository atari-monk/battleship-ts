import {PLAYER} from './type/PLAYER'
import {printGameState} from './render'
import {config} from './config'
import {attack, tooglePlayers} from './logic'
import {waitForButtonClick} from './input'
import {BattleshipGridRenderer} from './libs/../../../libs/battleship'
import {GAME_MODE} from './type/GAME_MODE'

export async function startGame() {
  let isGameOver = false
  let defender = config.players.get(PLAYER.PLAYER1)!
  let attacker = config.players.get(PLAYER.PLAYER2)!
  const renderer1 = new BattleshipGridRenderer(defender.grid)
  const renderer2 = new BattleshipGridRenderer(attacker.grid)

  while (!isGameOver) {
    const renderer = defender.role === PLAYER.PLAYER1 ? renderer1 : renderer2
    printGameState(defender.role, config, renderer)

    await attack(attacker, defender)

    isGameOver = defender.grid.isGameOver()

    printGameState(defender.role, config, renderer)

    if (isGameOver) {
      console.log('Game over! All ships have been sunk.')
      break
    }

    await waitForButtonClick('continueButton')
    if (config.mode === GAME_MODE.PLAYER_VS_AI) {
      ;[attacker, defender] = tooglePlayers(attacker, defender)
    }
  }
}
