var globToRegExp = require('glob-to-regexp');
var junk = require('junk')
var config = {};

// defaults
var _junkRegExp = junk.re;
    _root = './', // string: root directory
    _junk = false, // boolean: should we fetch junk files too? (.thumbnails, .DS_Store, etc)
    _type = 'filesAndFolders', // TODO
    _recursively = true, // should we look inside every folder too?
    _extended = true, // should we retrieve detailed properties of each file? (like isFile and isFolder)
    _filter = globToRegExp('*')

var update = function(options){
    options = options===undefined ? {} : options

    config.junkRegExp = options.junkRegExp===undefined ? new RegExp(_junkRegExp) : options.junkRegExp

    console.log(config.junkRegExp)

    config.root = options.root===undefined ? _root : options.root;
    config.junk = options.junk===undefined ? _junk : options.junk;
    config.type = options.type===undefined ? _type : options.type;
    config.recursively = options.recursively===undefined ? _recursively : options.recursively;
    config.extended = options.extended===undefined ? _extended : options.extended;
    config.filter =
            Object.prototype.toString.call(options.filter)==='[object String]'
                ? globToRegExp(options.filter, {extended: true})
                : options.filter instanceof RegExp
                        ? options.filter
                        : _filter


    return config
};

module.exports = config;
module.exports.update = update;