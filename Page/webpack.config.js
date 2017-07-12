var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		__dirname + '/app/script/main.js'
	],
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.json$/,
			loader: "json-loader"
		}, {
			test: /\.js$/,
			exclude: /nodel_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.html$/,
			loader: 'raw-loader'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/page.html"
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: "./public",
		inline: true,
		historyApiFallback: true,
		hot: true,
		host: "192.168.0.88"
	}
}