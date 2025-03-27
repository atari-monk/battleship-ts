/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.m?js$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts'],
  transformIgnorePatterns: ['/node_modules/(?!@atari-monk/event-emitter)/'],
}
