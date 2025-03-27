import {DIRECTION} from '../../libs/battleship/grid/type/DIRECTION'
import {ITest} from './tests'

export class GridEdgeTest {
  private static edgeMap = {
    [DIRECTION.LEFT]: {l: 1, r: 0, u: 0, d: 0, nr: 1, letter: 'A', number: 5},
    [DIRECTION.RIGHT]: {l: 0, r: 1, u: 0, d: 0, nr: 2, letter: 'J', number: 5},
    [DIRECTION.UP]: {l: 0, r: 0, u: 1, d: 0, nr: 3, letter: 'E', number: 1},
    [DIRECTION.DOWN]: {l: 0, r: 0, u: 0, d: 1, nr: 4, letter: 'E', number: 10},
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
    const {l, r, u, d, nr, letter, number} = GridEdgeTest.edgeMap[edge]
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
      /* 1  */ [0, 0, 0, 0, u, 0, 0, 0, 0, 0],
      /* 2  */ [0, 0, 0, 0, u, 0, 0, 0, 0, 0],
      /* 3  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 4  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 5  */ [l, l, 0, 0, 0, 0, 0, 0, r, r],
      /* 6  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 7  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 8  */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /* 9  */ [0, 0, 0, 0, d, 0, 0, 0, 0, 0],
      /* 10 */ [0, 0, 0, 0, d, 0, 0, 0, 0, 0],
    ]
  }

  public getTest(): ITest {
    return {
      key: `test4_${this.nr}`,
      description: `Test 4_${this.nr}: 2 cells on the ${
        DIRECTION[this.edge]
      } edge of the grid`,
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
