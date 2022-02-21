// https://cli.vuejs.org/config/#global-cli-config
module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/' },
            }
        }
    }
}