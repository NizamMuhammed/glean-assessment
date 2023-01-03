/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/__tests__/__mocks__/styleMock.js",
  },
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/__mocks__/styleMock.js"],
}
