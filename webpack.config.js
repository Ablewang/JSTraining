var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//基于模块的初始化，根据不同插件文件夹名称初始化插件
// let m = 'Select';//可搜索下拉框
// let m = 'Page'; //自适应变化分页
module.exports = {
	devtool: 'eval-source-map',
	entry: [
		__dirname + '/'+m+'/script/main.js'
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
			test: /\.(png|jpg)$/,
			loader: 'file-loader'
		},{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.html$/,
			loader: 'raw-loader'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/"+m+"/index.html"
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: "./public",
		inline: true,
		historyApiFallback: true,
		hot: true	}
}