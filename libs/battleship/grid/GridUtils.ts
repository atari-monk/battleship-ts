export class GridUtils {
  static labelToIndex(
    label: string,
    rows: number = 10,
    cols: number = 10
  ): { row: number; col: number } | null {
    const match = label.match(/^([A-J])(\d{1,2})$/i)
    if (!match) return null

    const col = match[1].toUpperCase().charCodeAt(0) - 65
    const row = parseInt(match[2], 10) - 1

    return row >= 0 && row < rows && col >= 0 && col < cols
      ? { row, col }
      : null
  }

  static indexToLabel(
    row: number,
    col: number,
    rows: number = 10,
    cols: number = 10
  ): string | null {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return null

    const letter = String.fromCharCode(col + 65)
    const number = row + 1

    return `${letter}${number}`
  }
}
