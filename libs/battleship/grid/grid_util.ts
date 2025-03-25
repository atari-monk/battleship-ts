import {ShipOrientation} from '../ai/type/Orientation'
import {Range} from './type/Range'

export function getRandomCell(range: Range): string {
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

export function labelToIndex(
  label: string,
  rows: number = 10,
  cols: number = 10
): {row: number; col: number} | null {
  const match = label.match(/^([A-J])(\d{1,2})$/i)
  if (!match) return null

  const col = match[1].toUpperCase().charCodeAt(0) - 65
  const row = parseInt(match[2], 10) - 1

  return row >= 0 && row < rows && col >= 0 && col < cols ? {row, col} : null
}

export function indexToLabel(
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

export function sortLabels(
  labels: Set<string>,
  orientation: ShipOrientation
): string[] {
  const labelArray = Array.from(labels)
  labelArray.sort((a, b) => {
    const {row: rowA, col: colA} = labelToIndex(a)!
    const {row: rowB, col: colB} = labelToIndex(b)!
    return orientation === ShipOrientation.Horizontal
      ? colA - colB
      : rowA - rowB
  })
  return labelArray
}
