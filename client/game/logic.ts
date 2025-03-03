import { handlePlayerInput } from './input'
import { PLAYER_TYPE } from './type/PLAYER_TYPE'
import { style } from './render'
import { ai } from './config'
import { PlayerConfig } from './type/PlayerConfig'

export function tooglePlayers(attacker: PlayerConfig, defender: PlayerConfig) {
  return [defender, attacker]
}

export async function attack(attacker: PlayerConfig, defender: PlayerConfig) {
  const { name: attackerName } = attacker
  const { grid } = defender

  let validMove = false
  let hitResult = { alreadyHit: false, shipHit: false }

  while (!validMove) {
    let input: string = ''

    if (attacker.type === PLAYER_TYPE.HUMAN) {
      //input = await getInputFromConsole(attackerName)
      input = await handlePlayerInput(attackerName)
      hitResult = grid.hitCell(input)
    } else if (attacker.type === PLAYER_TYPE.AI) {
      hitResult = ai.aiMove({
        minLetter: 'C',
        maxLetter: 'H',
        minNumber: 5,
        maxNumber: 5,
      })
    }

    const { alreadyHit } = hitResult
    if (alreadyHit) {
      console.log(`%cThis cell was already hit. Try again.`, style('yellow'))
    } else {
      validMove = true
    }
  }
}
