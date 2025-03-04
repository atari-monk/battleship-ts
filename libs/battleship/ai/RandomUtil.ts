import { Range } from '../grid/Range'

export class RandomUtil {
  static getRandomCell(range: Range): string {
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
}
