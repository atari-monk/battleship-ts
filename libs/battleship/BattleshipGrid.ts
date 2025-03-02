import { GridCell } from './GridCell'
import { Range } from './Range'

export class BattleshipGrid {
  private _grid: GridCell[][]
  private _aiShots
  private _aiHits

  private shipTypes: { [key: number]: string } = {
    1: 'C',
    2: 'B',
    3: 'D',
    4: 'S',
    5: 'P',
  }

  get grid(): GridCell[][] {
    return this._grid
  }

  constructor(public rows: number = 10, public cols: number = 10) {
    this._grid = this.generateGrid()
    this._aiShots = new Set()
    this._aiHits = new Set()
  }

  public toString(hideShips = false): string {
    const columnLabels =
      '   ' +
      Array.from({ length: this.cols }, (_, i) =>
        String.fromCharCode(65 + i)
      ).join(' ')

    const gridRows = this._grid
      .map(
        (row, rowIndex) =>
          (rowIndex + 1).toString().padStart(2, ' ') +
          ' ' +
          row
            .map((cell) =>
              cell.isHit
                ? cell.shipId !== undefined
                  ? 'X'
                  : 'O'
                : cell.shipId !== undefined
                ? hideShips
                  ? '-'
                  : this.shipTypes[cell.shipId] || '?'
                : '-'
            )
            .join(' ')
      )
      .join('\n')

    return columnLabels + '\n' + gridRows
  }

  public isGameOver(): boolean {
    return this._grid.every((row) =>
      row.every((cell) => cell.shipId === undefined || cell.isHit)
    )
  }

  public labelToIndex(label: string): { row: number; col: number } | null {
    const match = label.match(/^([A-J])(\d{1,2})$/i)
    if (!match) return null

    const col = match[1].toUpperCase().charCodeAt(0) - 65
    const row = parseInt(match[2], 10) - 1

    return row >= 0 && row < this.rows && col >= 0 && col < this.cols
      ? { row, col }
      : null
  }

  public indexToLabel(row: number, col: number): string | null {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return null

    const letter = String.fromCharCode(col + 65)
    const number = row + 1

    return `${letter}${number}`
  }

  public hitCell(label: string, isAI: boolean = false): boolean {
    const position = this.labelToIndex(label)
    if (!position) throw new Error('labelToIndex fail')

    const { row, col } = position

    if (this._grid[row][col].isHit) {
      return false
    }

    this._grid[row][col].isHit = true

    if (isAI && this._grid[row][col].shipId) {
      this._aiHits.add(label)
    }

    return true
  }

  private generateGrid(): GridCell[][] {
    return Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({
        isHit: false,
      }))
    )
  }

  public placeFleet(enforceSpacing: boolean = true): boolean {
    const ships = [5, 4, 3, 3, 2]
    let shipId = 1

    for (const shipSize of ships) {
      let placed = false
      let attempts = 0

      while (!placed && attempts < 100) {
        const orientation = Math.random() < 0.5 ? 'H' : 'V'
        const maxRow = orientation === 'V' ? this.rows - shipSize : this.rows
        const maxCol = orientation === 'H' ? this.cols - shipSize : this.cols
        const row = Math.floor(Math.random() * maxRow)
        const col = Math.floor(Math.random() * maxCol)

        if (
          this.canPlaceShip(
            row,
            col,
            orientation as 'H' | 'V',
            shipSize,
            enforceSpacing
          )
        ) {
          this.placeShip(row, col, orientation as 'H' | 'V', shipSize, shipId)
          placed = true
        }
        attempts++
      }

      if (!placed) {
        console.error(
          `Failed to place ship of size ${shipSize} after 100 attempts.`
        )
        return false
      }
      shipId++
    }
    return true
  }

  private canPlaceShip(
    row: number,
    col: number,
    orientation: 'H' | 'V',
    size: number,
    enforceSpacing: boolean
  ): boolean {
    const coords: { row: number; col: number }[] = []

    if (orientation === 'H') {
      if (col + size > this.cols) return false
      for (let i = 0; i < size; i++) {
        coords.push({ row, col: col + i })
      }
    } else {
      if (row + size > this.rows) return false
      for (let i = 0; i < size; i++) {
        coords.push({ row: row + i, col })
      }
    }

    for (const { row, col } of coords) {
      if (this._grid[row][col].shipId !== undefined) {
        return false
      }
    }

    if (enforceSpacing) {
      for (const { row: r, col: c } of coords) {
        for (let i = r - 1; i <= r + 1; i++) {
          for (let j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
              if (this._grid[i][j].shipId !== undefined) {
                return false
              }
            }
          }
        }
      }
    }

    return true
  }

  private placeShip(
    row: number,
    col: number,
    orientation: 'H' | 'V',
    size: number,
    shipId: number
  ): void {
    if (orientation === 'H') {
      for (let i = 0; i < size; i++) {
        this._grid[row][col + i].shipId = shipId
      }
    } else {
      for (let i = 0; i < size; i++) {
        this._grid[row + i][col].shipId = shipId
      }
    }
  }

  public placeShipsFromArray(): boolean {
    const shipGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    if (shipGrid.length !== this.rows || shipGrid[0].length !== this.cols) {
      console.error('The grid must be 10x10.')
      return false
    }

    let shipId = 1
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (shipGrid[row][col] === 1) {
          if (this._grid[row][col].shipId === undefined) {
            this._grid[row][col].shipId = shipId
          }
        }
      }
    }

    return true
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

  private aiRandomNotTriedCell(range: Range): string {
    let hit = this.getRandomCell(range)
    while (!this._aiShots.has(hit)) {
      this._aiShots.add(hit)
      return hit
    }
    return ''
  }

  private aiTargetShip(label: string): string {
    const cell = this.labelToIndex(label)!

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

    return this.indexToLabel(hitRow, hitCol)!
  }

  private isFirstHit() {
    return this._aiHits.size > 0
  }

  private getFirstHit(): string {
    return this._aiHits.values().next().value as string
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
    return input
  }
}
