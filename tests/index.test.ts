import { greet } from '../libs/battleship/index'

test('greet function', () => {
  expect(greet('Alice')).toBe('Hello, Alice!')
})
