module.exports = {
  roots: ['src'],
  modulePaths: ['src'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMocks.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};
