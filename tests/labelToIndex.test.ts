import {labelToIndex} from '../libs/battleship'

describe('labelToIndex', () => {
  test('labelToIndex should convert labels to correct row and column indices', () => {
    expect(labelToIndex('A1')).toEqual({row: 0, col: 0})
    expect(labelToIndex('C5')).toEqual({row: 4, col: 2})
    expect(labelToIndex('J10')).toEqual({row: 9, col: 9})

    expect(labelToIndex('A0')).toBeNull()
    expect(labelToIndex('K1')).toBeNull()
    expect(labelToIndex('J11')).toBeNull()
    expect(labelToIndex('')).toBeNull()
    expect(labelToIndex('B-2')).toBeNull()
    expect(labelToIndex('5C')).toBeNull()
  })
})
