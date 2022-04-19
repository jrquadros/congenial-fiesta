export default {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/'],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json'],
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/'],

  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};
