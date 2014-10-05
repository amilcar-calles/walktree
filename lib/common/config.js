var globToRegExp = require('glob-to-regexp');

var config = {};

// defaults
var _root = './',
    _junk = false,
    _type = 'filesAndFolders',
    _recursively = true,
    _extended = true,
    _filter = globToRegExp('*')

var update = function(options){
    options = options===undefined ? {} : options

    config.root = options.root===undefined ? _root : options.root ; // string: root directory
    config.junk = options.junk===undefined ? _junk : options.junk; // boolean: should we fetch junk files too? (.thumbnails, .DS_Store, etc)
    config.type = options.type===undefined ? _type : options.type; // string: files, folders, filesAndFolders
    config.recursively = options.recursively===undefined ? _recursively : options.recursively; // should we look inside every folder too?
    config.extended = options.extended===undefined ? _extended : options.extended; // should we retrieve detailed properties of each file? (like isFile and isFolder
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