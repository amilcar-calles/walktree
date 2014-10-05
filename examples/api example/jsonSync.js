var walktree = require('../../lib/index');

var w = walktree.arraySync(
    {
        root: './',
        junk: false,
        filter: '*',
        extended: false
    }
);

console.log(w)