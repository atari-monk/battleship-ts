import {DIRECTION} from '../grid/type/DIRECTION'

export function coinToss(): boolean {
  return Math.random() < 0.5
}

export function randomSign(): -1 | 1 {
  return Math.random() < 0.5 ? -1 : 1
}

export function getRandomDirection(): DIRECTION {
  const directions = Object.values(DIRECTION).filter(
    v => typeof v === 'number'
  ) as DIRECTION[]
  return directions[Math.floor(Math.random() * directions.length)]
}
