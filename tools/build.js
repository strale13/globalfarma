const Webpack = require('webpack');
const Chalk = require('chalk');

const webpackConfig = require('./webpack.config');

Webpack(webpackConfig(null, {mode: 'production'}), (err, stats) => {
    if (err) {
        throw err;
    }

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
        console.log(Chalk.red('  Build failed with errors.\n'));
        process.exit(1);
    }

    console.log(Chalk.cyan('  Build complete.\n'));
});
