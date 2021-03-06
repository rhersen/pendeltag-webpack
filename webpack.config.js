module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.hbs$/, loader: "handlebars"}
        ]
    },
    devServer: {
        proxy: {
            '/json/*': {
                target: 'http://localhost:1337',
                secure: false
            }
        }
    }
}