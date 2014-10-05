var walktree = require('../../lib/index');

var w = walktree.jsonSync(
    {
        root: '../../',
        junk: false,
        filter: '*',
        extended: false
    }
);

console.log(w)