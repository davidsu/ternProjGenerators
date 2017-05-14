#!/usr/bin/env node
//usage ./santa-editor.js > {projhomedir}/.tern-proj
const dotSanta = require('os').homedir() + '/.santa'
const santaConfig = require('jsonfile').readFileSync(dotSanta)
var runner = require('./tern_proj_generator_santa.js')
const baseDir = santaConfig['wix-santa'].location
runner.run(baseDir, result => {
    global.requirejs = () => {}
    global.requirejs.config =  configObj => {
        const paths = configObj.paths
        const keys = Object.keys(paths)
        result.plugins.requirejs.paths.utils = 'packages/utils/src/main/utils'
        keys.forEach(key => {
            if(/node_modules/.test(paths[key]) && !result.plugins.requirejs.paths[key]){
                result.plugins.requirejs.paths[key] = paths[key].replace(/^\.\//, '')
            }
        })
    }
    require(baseDir + '/app/main-r-idea.js')
    // console.log(JSON.stringify(requirejs, null, 4))
    console.log(JSON.stringify(result, null, 4))
})

