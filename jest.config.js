module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js"],
    setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  };
  