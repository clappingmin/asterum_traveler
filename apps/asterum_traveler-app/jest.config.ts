export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '^reset-css$': '<rootDir>/__mocks__/styleMock.js',
    '^styled-components$': require.resolve('styled-components'),
  },
  globals: {
    'ts-jest': {
      tsconfig: false,
      useESM: true,
      babelConfig: true,
      plugins: ['babel-plugin-transform-vite-meta-env'],
    },
  },

  transform: {
    '^.+\\.(ts|tsx|js|jsx|mjs)$': 'babel-jest',
  },
};
