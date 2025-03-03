import { BattleshipAI } from './BattleshipAI'
import { IStrategy } from './IStrategy'
import { Range } from '../grid/Range'

export class TargetStrategy implements IStrategy {
  private _ai

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): string {
    const move = this.attackShip()
    console.log(`Target: ${move}`)
    return move
  }

  private attackShip(): string {
    const target = this._ai.getTarget()
    const cell = this._ai.enemyGrid.labelToIndex(target)!

    const directionsX = { left: -1, right: 1 }
    const directionX = Math.random() < 0.5 ? 'left' : 'right'

    const directionsY = { up: -1, down: 1 }
    const directionY = Math.random() < 0.5 ? 'up' : 'down'

    const direction = Math.random() < 0.5 ? 'X' : 'Y'

    let hitRow = cell.row
    let hitCol = cell.col

    if (direction === 'X') {
      hitRow += directionsX[directionX]
    } else {
      hitCol += directionsY[directionY]
    }

    return this._ai.enemyGrid.indexToLabel(hitRow, hitCol)!
  }
}
