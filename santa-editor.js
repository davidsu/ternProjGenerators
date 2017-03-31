#!/usr/bin/env node
//usage ./santa-editor.js > {projhomedir}/.tern-proj
const dotSanta = require('os').homedir() + '/.santa'
const santaConfig = require('jsonfile').readFileSync(dotSanta)
var runner = require('./tern_proj_generator_santa.js')
runner.run(santaConfig['Santa-Editor'].location)
