var fs = require('fs'),
    path = require('path'),
    async = require('async'),
    junk = require('junk'),
    walk = require('fs-walk'),
    globToRegExp = require('glob-to-regexp');









exports.array = {};
exports.json = {};


exports.array.sync = function(options){
    if(options===undefined) options = {};
    if(options.dir===undefined) options.dir = './';
    if(options.junk===undefined) options.junk = false;
    if(Object.prototype.toString.call(options.filter)=='[object String]') options.filter = globToRegExp(options.filter, {extended: true});

    var files = [];
    walk.walkSync(options.dir, function(basedir, filename, stat) {
        files.push(path.join(basedir, filename))
    });
    var filtered = [];
    files.forEach(function(file){
        var include = true;
        if(options.filter == undefined){
            include = true
        }else{
            if(!options.filter.test(file)) {
                include = false
            }
        }
        if(include){
            filtered.push(file)
        }
    });
    if(!options.junk) {
        filtered = filtered.filter(junk.not)
    }
    return filtered
};


exports.json.sync = function(options){
    if(options===undefined) options = {};
    if(options.dir===undefined) options.dir = './';
    if(options.junk===undefined) options.junk = false;
    if(Object.prototype.toString.call(options.filter)=='[object String]') options.filter = globToRegExp(options.filter, {extended: true});

    var files = []
    walk.walkSync(options.dir, function(basedir, filename, stat) {
        files.push({'parent': basedir, 'name': filename, stat: stat})
    });
    var filtered = [];
    files.forEach(function(item){
        var include = true;
        if(options.filter == undefined){
            include = true
        }else{
            if(!options.filter.test(item.name)) {
                include = false
            }
        }
        if(include){
            filtered.push(item)
        }
    });

    var result = []
    if(!options.junk) {
        filtered.forEach(function(file){
            if(!(junk.is(file.name)||junk.is(file.parent))){
                result.push(file)
            }
        })
    }else{
        result = filtered
    }

    return result
};