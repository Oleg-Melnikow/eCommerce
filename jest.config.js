module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
