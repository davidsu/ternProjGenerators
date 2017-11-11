#!/usr/bin/env node
 // usage: node tern_proj_generator.js `pwd`/packages > .tern-project
function ignoreEntry(entry) {
    if(/\.(html|scss|png|jpg)$/.test(entry))
        return true
    return false
}

function run(baseDir, callback) {
    var spawn = require('child_process').spawn;
    spawn = spawn('ag --nocolor -g . && find js | grep js$', {cwd: baseDir, shell: true});
    var result = '';
    spawn.on('close', function() {
        var resArr = result.split('\n')
        result = {
            "ecmaVersion": 8,
            "libs": [
                "browser",
                "ecma6"
            ],
            "plugins": {
                "node": {},
                "modules": {},
                "es_modules": {},
                "requirejs": {
                    "baseUrl": "./",
                    paths: {
                        lodash: "./node_modules/lodash/core"
                    },
                    map: {}
                }
            }
        }
        var paths = result.plugins.requirejs.paths;
        var map = result.plugins.requirejs.map;
        resArr.forEach(curr => {
            if (!ignoreEntry(curr)) {
                // curr = curr.replace(/.*packages/, 'packages')
                curr = curr.replace(baseDir + '/', '');
                var key1 = curr.replace(/.*packages\/(.*)src\/main\/([^.]*)\.js$/, '$1$2')
                var key2 = curr.replace(/.*\/([^/.]*)\.js$/, '$1');
                if (key1 && key1 !== curr) {
                    paths[key1] = curr.replace(/\.js$/, '');
                }
                if (key2 && key2 !== curr) {
                    var mapkey = curr.replace(/.*(packages\/.*?)\/src\/main\/.*/, '$1')
                    map[mapkey] = map[mapkey] || {};
                    map[mapkey][key2] = curr.replace(/\.js$/, '');


                    mapkey = curr.replace(/.*packages\/(.*?)\/src\/main\/.*/, '$1')
                    map[mapkey] = map[mapkey] || {};
                    map[mapkey][key2] = curr.replace(/\.js$/, '');


                    mapkey = curr.replace(/.*packages\/.*?\/src\/main\/([^/]*).*/, '$1')
                    map[mapkey] = map[mapkey] || {};
                    map[mapkey][key2] = curr.replace(/\.js$/, '');


                    mapkey = curr.replace(/.*packages\/.*?\/src\/main\/(.*?)\/[^/].js$/, '$1')
                    map[mapkey] = map[mapkey] || {};
                    map[mapkey][key2] = curr.replace(/\.js$/, '');


                    if (!paths[key2] || (/packages/.test(curr) && !/packages/.test(paths[key2])) )
                        paths[key2] = curr.replace(/\.js$/, '');
                    else {
                        //todo delete key2 from global paths and blacklist it
                    }
                }
            }
        })

        callback(result)
        // console.log(JSON.stringify(result, null, 4))
        // console.log(result.plugins.requirejs.paths)
    })


    spawn.stdout.on('data', function(data) {
        result = result + data.toString('utf8');
    })
}
module.exports = {
    run
}
