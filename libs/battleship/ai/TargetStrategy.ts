import { BattleshipAI } from './BattleshipAI'
import { IStrategy } from './IStrategy'
import { Range } from '../grid/Range'

export class TargetStrategy implements IStrategy {
  private _ai
  private hits: { row: number; col: number }[] = []
  private orientation: 'horizontal' | 'vertical' | null = null

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): string {
    const target = this._ai.getTarget()
    const cell = this._ai.enemyGrid.labelToIndex(target)!

    this.hits.push(cell)
    if (this.hits.length === 2) {
      this.determineOrientation()
    }

    const nextMove = this.getNextMove(cell)
    const shot = this._ai.enemyGrid.indexToLabel(nextMove.row, nextMove.col)!

    console.log(`Target: ${shot}`)
    return shot
  }

  private determineOrientation() {
    const [firstHit, secondHit] = this.hits
    if (firstHit.row === secondHit.row) {
      this.orientation = 'horizontal'
    } else if (firstHit.col === secondHit.col) {
      this.orientation = 'vertical'
    }
  }

  private getNextMove(cell: { row: number; col: number }) {
    if (this.orientation === 'horizontal') {
      return { row: cell.row, col: cell.col + (Math.random() < 0.5 ? -1 : 1) }
    } else if (this.orientation === 'vertical') {
      return { row: cell.row + (Math.random() < 0.5 ? -1 : 1), col: cell.col }
    }

    const isHorizontal = Math.random() < 0.5
    if (isHorizontal) {
      return { row: cell.row, col: cell.col + (Math.random() < 0.5 ? -1 : 1) }
    } else {
      return { row: cell.row + (Math.random() < 0.5 ? -1 : 1), col: cell.col }
    }
  }
}
