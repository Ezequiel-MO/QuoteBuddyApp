module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.jsx?$': [
			'babel-jest',
			{
				presets: [
					'@babel/preset-env',
					['@babel/preset-react', { runtime: 'automatic' }]
				]
			}
		],
		'^.+\\.tsx?$': 'ts-jest'
	},
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
		'^@screens/(.*)$': '<rootDir>/src/screens/$1'
	}
}
