module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts}", "!**/{types,hooks}/**"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
