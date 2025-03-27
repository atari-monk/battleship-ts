import {DIRECTION} from '../../libs/battleship/grid/type/DIRECTION'
import {GridEdgeTest} from './GridEdgeTest'

type TestKeys = `test${number}` | `test${number}_${number}`

export interface ITest {
  key: TestKeys
  description: string
  grid: number[][]
  range: {
    minLetter: string
    maxLetter: string
    minNumber: number
    maxNumber: number
  }
}

export const tests: Record<TestKeys, ITest> = {}

const test1: ITest = {
  key: 'test1',
  description: 'Test 1: 4 cells in a row',
  grid: [
    //      A  B  C  D  E  F  G  H  I  J
    /*1 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*2 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*3 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*4 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*5 */ [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    /*6 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*7 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*8 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*9 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*10*/ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  range: {
    minLetter: 'C',
    maxLetter: 'H',
    minNumber: 5,
    maxNumber: 5,
  },
}

const test2: ITest = {
  key: 'test2',
  description: 'Test 2: 4 cells in a column',
  grid: [
    //      A  B  C  D  E  F  G  H  I  J
    /*1 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*2 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*3 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*4 */ [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    /*5 */ [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    /*6 */ [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    /*7 */ [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    /*8 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*9 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*10*/ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  range: {
    minLetter: 'F',
    maxLetter: 'F',
    minNumber: 3,
    maxNumber: 8,
  },
}

const test3: ITest = {
  key: 'test3',
  description: 'Test 3: 2 x 4 cells in a row and a column',
  grid: [
    //      A  B  C  D  E  F  G  H  I  J
    /*1 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*2 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*3 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*4 */ [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    /*5 */ [0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
    /*6 */ [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    /*7 */ [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    /*8 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*9 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*10*/ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  range: {
    minLetter: 'C',
    maxLetter: 'H',
    minNumber: 4,
    maxNumber: 7,
  },
}

const test4_1: ITest = new GridEdgeTest(DIRECTION.LEFT).getTest()
const test4_2: ITest = new GridEdgeTest(DIRECTION.RIGHT).getTest()
const test4_3: ITest = new GridEdgeTest(DIRECTION.UP).getTest()
const test4_4: ITest = new GridEdgeTest(DIRECTION.DOWN).getTest()

const test5: ITest = {
  key: 'test5',
  description: 'Test 5: Fleet of 5 ships',
  grid: [
    //      A  B  C  D  E  F  G  H  I  J
    /*1 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*2 */ [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    /*3 */ [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    /*4 */ [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    /*5 */ [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    /*6 */ [0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
    /*7 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*8 */ [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    /*9 */ [0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
    /*10*/ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  range: {
    minLetter: 'A',
    maxLetter: 'J',
    minNumber: 1,
    maxNumber: 10,
  },
}

const list = [test1, test2, test3, test4_1, test4_2, test4_3, test4_4, test5]

list.forEach(test => {
  tests[test.key] = test
})

export const test: ITest = tests.test4_1
