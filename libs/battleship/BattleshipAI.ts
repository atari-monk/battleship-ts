import { BattleshipGrid } from './BattleshipGrid'
import { Range } from './Range'

export class BattleshipAI {
  private enemyGrid: BattleshipGrid
  private shotsTaken: Set<string>
  private hits: Set<string>

  constructor(enemyGrid: BattleshipGrid) {
    this.enemyGrid = enemyGrid
    this.shotsTaken = new Set()
    this.hits = new Set()
  }

  public aiMove(
    range: Range = {
      minLetter: 'A',
      maxLetter: 'J',
      minNumber: 1,
      maxNumber: 10,
    }
  ) {
    let input
    if (this.isFirstHit()) {
      input = this.aiTargetShip(this.getFirstHit())
      console.log(`Target: ${input}`)
    } else {
      input = this.aiRandomNotTriedCell(range)!
      console.log(`Random: ${input}`)
    }
    const result = this.enemyGrid.hitCell(input)
    if (result.shipHit) this.hits.add(input)
    return result
  }

  private aiRandomNotTriedCell(range: Range): string {
    let hit = this.getRandomCell(range)
    while (!this.shotsTaken.has(hit)) {
      this.shotsTaken.add(hit)
      return hit
    }
    return ''
  }

  private getRandomCell(range: Range): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const minLetterIndex = letters.indexOf(range.minLetter.toUpperCase())
    const maxLetterIndex = letters.indexOf(range.maxLetter.toUpperCase())

    const letter =
      letters[
        Math.floor(Math.random() * (maxLetterIndex - minLetterIndex + 1)) +
          minLetterIndex
      ]
    const number =
      Math.floor(Math.random() * (range.maxNumber - range.minNumber + 1)) +
      range.minNumber

    return letter + number
  }

  private aiTargetShip(label: string): string {
    const cell = this.enemyGrid.labelToIndex(label)!

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

    return this.enemyGrid.indexToLabel(hitRow, hitCol)!
  }

  private isFirstHit() {
    return this.hits.size > 0
  }

  private getFirstHit(): string {
    return this.hits.values().next().value as string
  }
}
