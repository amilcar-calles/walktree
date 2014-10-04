# Walktree

A easy to use module to convert recursive directory listing into an array or json object.

## Install

    npm install walktree

## Usage

```js
    var walktree = require('walktree');
    console.log(walktree.array.sync())
    // list of all files recursively (parent folder: current execution file)
```

## Functions

```js
    array.sync(): Synchronously fetch all files in string array format
     output: 
        ['file1.txt', 'file2.txt', 'picture1.jpg']
    json.sync(): Synchronously fetch all files in string array format
     output:
         [
            {
                parent: './',
                name: 'file1.txt'
                stats: [fsObject stats]
            },
            {
                parent: './',
                name: 'file2.txt'
                stats: [fsObject stats]
            },
            {
                parent: './',
                name: 'picture1.txt'
                stats: [fsObject stats]
            },
        ]
```

## Options

```js
  walktree([{[directory], [filter], [junk]}])
```
A json options is not required, but when no parameter is passed, all files in the current
folder will be listed recursively.

1. `directory` is the root directory for the file search.
2. `filter` is the wildcard type or RegExp to filter the result (default: "*")
3. `junk` when is false, will avoid junk files like ".thumbnails" or ".DS_Store", true will show everything (default: false)

```js
    var walktree = require('walktree');
    
    var w = walktree.json.sync(
        {
            directory: './templates'
          , filter: '*.html'
      //  , junk: true
        }
    );
    console.log(w)
    // will show only html files inside template folder
```

## License

Copyright (c) 2014, Amilcar Calles <calles.arriaga@gmail.com>

Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer. Redistributions in binary 
form must reproduce the above copyright notice, this list of conditions and
the following disclaimer in the documentation and/or other materials provided
with the distribution.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
