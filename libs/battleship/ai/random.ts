export function coinToss(): boolean {
  return Math.random() < 0.5
}

export function randomSign(): -1 | 1 {
  return Math.random() < 0.5 ? -1 : 1
}
