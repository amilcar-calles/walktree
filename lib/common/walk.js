fs= require('fs');
walk = require('fs-walk');
path = require('path');
junk = require('junk');


var _walkSync = function(options) {

    config = require('./config');
    config.update(options);
    junk.re = config.regexp;

    // Main function to walk sync

    var files = [];

    if (!config.recursively) {
        fs.readdirSync(config.root).forEach(function (filename) {
            var stat = fs.statSync(path.join(config.root, filename))
            var json = {
                'parent': config.root,
                'name': filename,
                'stat': stat
            };
            if (config.extended) {
                json.isFile = stat.isFile();
                json.isFolder = stat.isFolder();
            }
            files.push(json)
        })
    } else {
        walk.walkSync(config.root, function (basedir, filename, stat) {
            var json = {
                'parent': basedir,
                'name': filename,
                'stat': stat
            };
            if (config.extended) {
                json.isFile = stat.isFile();
                json.isFolder = stat.isFolder();
            }
            switch (config.type) {
                case 'files':
                    if (json.isFile)
                        files.push(json);
                    break;
                case 'folders':
                    if (json.isFolder)
                        files.push(json);
                    break;
                case 'filesAndFolders':
                    if (json.isFile || json.isFolder)
                        files.push(json);
            }

        })
    }


    // Filter

    var filtered = [];
    files.forEach(function(item){
        if(config.filter.test(item.name)) {
            filtered.push(item)
        }
    });

    // Junk
    junk.re = config.junkRegExp;
    var result = [];
    if(config.junk) {
        result = filtered
    }else{
        filtered.forEach(function(file){
            if(!(junk.is(file.parent)||junk.is(file.name))){
                result.push(file)
            }
        })
    }

    return result
};

module.exports.walkSync = _walkSync;