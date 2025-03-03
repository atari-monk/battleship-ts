import { BattleshipAI } from './BattleshipAI'
import { IStrategy } from './IStrategy'
import { Range } from '../grid/Range'

export class RandomStrategy implements IStrategy {
  private _ai

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): string {
    const move = this.attackNewRandomCell(range)
    console.log(`Random: ${move}`)
    return move
  }

  private attackNewRandomCell(range: Range): string {
    let hit = this.getRandomCell(range)
    while (this._ai.shotsTaken.has(hit)) {
      hit = this.getRandomCell(range)
    }
    this._ai.shotsTaken.add(hit)
    return hit
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
}
