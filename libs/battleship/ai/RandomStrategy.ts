import { BattleshipAI } from './BattleshipAI'
import { IStrategy } from './IStrategy'
import { Range } from '../grid/Range'
import { RandomUtil } from './RandomUtil'

export class RandomStrategy implements IStrategy {
  private _ai

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): string {
    let shot = RandomUtil.getRandomCell(range)
    while (this._ai.shotsTaken.has(shot)) {
      shot = RandomUtil.getRandomCell(range)
    }
    this._ai.shotsTaken.add(shot)
    console.log(`Random: ${shot}`)
    return shot
  }
}
