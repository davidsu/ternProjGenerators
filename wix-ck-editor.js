#!/usr/bin/env node
// usage: node tern_proj_generator.js '$HOME/projects/wix-ck-editor' > '$HOME/projects/wix-ck-editor/'.tern-project
var spawn = require('child_process').spawn;
var arg = process.argv.splice(2);
spawn = spawn('find', ['src']);
var result = '';
spawn.on('close', function() {
    var resArr = result.split('\n')
    result = {
        "libs": [
            "browser"
        ],
        "plugins": {
            "requirejs": {
                "baseUrl": "/Users/davidsu/projects/wix-ck-editor/src",
                "paths": resArr.reduce(function(acc, curr) {
                    var key1 = curr.replace(/src\/([^.]*)\.js$/, '$1')
                    var key2 = curr.replace(/([^/.]*)\.js$/, '$1');
                    if (key1 && key1 !== curr) {
                        acc[key1] = curr.replace(__dirname + '/', '').replace(/\.js$/, '');
                    }
                    if (key2 && key2 !== curr) {
                        acc[key2] = curr.replace(__dirname + '/', '').replace(/\.js$/, '');
                    }
                    return acc;
                }, {})
            }
        }
    }
    console.log(JSON.stringify(result, null, 4))
    // console.log(result.plugins.requirejs.paths)
})

spawn.stdout.on('data', function(data) {
    result = result + data.toString('utf8');
})
