/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  testMatch: ['**/*.test.{js,jsx,ts,tsx}'],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  preset: "ts-jest",
};