import {DIRECTION} from '../../libs/battleship/grid/type/DIRECTION'
import {ITest} from './tests'

export class GridCornerTest {
  private static edgeMap = {
    [DIRECTION.LEFT]: {l: 1, r: 0, u: 0, d: 0, nr: 1, letter: 'A', number: 1},
    [DIRECTION.RIGHT]: {l: 0, r: 1, u: 0, d: 0, nr: 2, letter: 'J', number: 1},
    [DIRECTION.UP]: {l: 0, r: 0, u: 1, d: 0, nr: 3, letter: 'J', number: 10},
    [DIRECTION.DOWN]: {l: 0, r: 0, u: 0, d: 1, nr: 4, letter: 'A', number: 10},
  }

  private edge: DIRECTION
  private l: number
  private r: number
  private u: number
  private d: number
  private nr: number
  private letter: string
  private number: number

  constructor(edge: DIRECTION) {
    this.edge = edge
    const {l, r, u, d, nr, letter, number} = GridCornerTest.edgeMap[edge]
    this.l = l
    this.r = r
    this.u = u
    this.d = d
    this.nr = nr
    this.letter = letter
    this.number = number
  }

  private generateGrid(): number[][] {
    const u = this.u
    const l = this.l
    const r = this.r
    const d = this.d
    return [
      //        A  B  C  D  E  F  G  H  I  J
      /* 1  */ [l, 0, 0, 0, 0, 0, 0, 0, 0, u],
      /* 2  */ [l, 0, 0, 0, 0, 0, 0, 0, 0, u],
      /* 3  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 4  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 5  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 6  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 7  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 8  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 9  */ [d, 0, 0, 0, 0, 0, 0, 0, 0, r],
      /* 10 */ [d, 0, 0, 0, 0, 0, 0, 0, 0, r],
    ]
  }

  public getTest(): ITest {
    return {
      key: `test5_${this.nr}`,
      description: `Test 5_${this.nr}: 2 cells on the ${
        DIRECTION[this.edge]
      } corner of the grid`,
      grid: this.generateGrid(),
      range: {
        minLetter: this.letter,
        maxLetter: this.letter,
        minNumber: this.number,
        maxNumber: this.number,
      },
    }
  }
}
