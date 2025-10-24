import type {Config} from "jest";

const config: Config = {
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
    testTimeout: 30000,
    moduleFileExtensions: ["ts", "js", "json"],
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
}

export default config;