import {BattleshipGrid} from './BattleshipGrid'

export class BattleshipGridRenderer {
  constructor(private grid: BattleshipGrid) {}

  public render(hideShips: boolean = false): string {
    const rows = this.grid.grid
    const cols = rows[0].length

    const columnLabels =
      '   ' +
      Array.from({length: cols}, (_, i) => String.fromCharCode(65 + i)).join(
        ' '
      )

    const gridRows = rows
      .map((row, rowIndex) => {
        const rowLabel = (rowIndex + 1).toString().padStart(2, ' ')
        const cells = row
          .map(cell => {
            if (cell.isHit) {
              return cell.shipId ? 'X' : 'O'
            }
            return cell.shipId
              ? hideShips
                ? '-'
                : this.getShipType(cell.shipId)
              : '-'
          })
          .join(' ')
        return `${rowLabel} ${cells}`
      })
      .join('\n')

    return `${columnLabels}\n${gridRows}`
  }

  private getShipType(shipId: number): string {
    return this.grid.getShipType(shipId)
  }
}
