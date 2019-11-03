module.exports = {
	plugins: [
		require('autoprefixer')({
			overrideBrowserslist: ['ie >= 10', 'Edge >= 12', 'Firefox >= 20', 'Chrome >= 29', 'Safari >= 9'],
		}),
		require('cssnano')({
			preset: 'default',
		})
	]
}