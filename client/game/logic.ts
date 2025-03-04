import { getInputFromPage, setInputResult } from './input'
import { PLAYER_TYPE } from './type/PLAYER_TYPE'
import { colorStyle } from './render'
import { ai } from './config'
import { PlayerConfig } from './type/PlayerConfig'
import { HitResult } from '../../libs/battleship/grid/type/HitResult'

export function tooglePlayers(attacker: PlayerConfig, defender: PlayerConfig) {
  return [defender, attacker]
}

export async function attack(attacker: PlayerConfig, defender: PlayerConfig) {
  const { name: attackerName } = attacker
  const { grid } = defender

  let validMove = false
  let hitResult: HitResult = {
    label: '',
    alreadyHit: false,
    shipHit: false,
    log: (isShipHit) => '',
  }

  while (!validMove) {
    let shot: string = ''

    if (attacker.type === PLAYER_TYPE.HUMAN) {
      shot = await getInputFromPage(attackerName)
      hitResult = grid.hitCell(shot)
      console.log(`${attackerName}:`, shot, hitResult.shipHit ? 'hit' : 'miss')
    } else if (attacker.type === PLAYER_TYPE.AI) {
      hitResult = ai.aiMove({
        minLetter: 'C',
        maxLetter: 'H',
        minNumber: 5,
        maxNumber: 5,
      })
      console.log(hitResult.log!(hitResult.shipHit))
    }

    const { alreadyHit } = hitResult
    if (alreadyHit) {
      console.log(
        `%cThis cell was already hit. Try again.`,
        colorStyle('yellow')
      )
    } else {
      validMove = true
      await setInputResult(attacker.name, hitResult.label, hitResult.shipHit)
    }
  }
}
