import { Range } from '../../grid/type/Range'
import { AttackResult } from './AttackResult'

export interface IStrategy {
  attack(range: Range): AttackResult
  updateState(): void
}
