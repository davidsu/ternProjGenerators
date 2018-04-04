module.exports = function getVsCodeConfig(baseDir, result){
    const config = result.plugins.requirejs
    delete config.baseUrl
    const vsCodeRequireConfig = `requirejs.config(${JSON.stringify(result.plugins.requirejs, null, 4)})`
    const fileName = baseDir + '/.vsrequirejsconfig.js'
    require('fs').writeFileSync(fileName, vsCodeRequireConfig)
}
