import { Range } from './../grid/Range'
import { AttackResult } from './AttackResult'

export interface IStrategy {
  attack(range: Range): AttackResult
  updateState(): void
}
