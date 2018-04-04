#!/usr/bin/env node
//usage ./santa-editor.js > {projhomedir}/.tern-proj
const dotSanta = require('os').homedir() + '/.santa'
const santaConfig = require('jsonfile').readFileSync(dotSanta)
var runner = require('./tern_proj_generator_santa.js')
const baseDir = santaConfig['Santa-Editor'].location
runner.run(baseDir, result => {
    require('./writeVsCodeConfig')(baseDir, result)
    console.log(JSON.stringify(result, null, 4))
})
