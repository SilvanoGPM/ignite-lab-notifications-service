export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/app/$1',
    '^@helpers/(.*)$': '<rootDir>/helpers/$1',
    '^@infra/(.*)$': '<rootDir>/infra/$1',
    '^@test/(.*)$': '<rootDir>/../test/$1',
  },
};
