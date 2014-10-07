# Walktree

A easy to use module to convert recursive directory listing into an array or json object.

## Install

    npm install walktree

## Usage

```js
    var walktree = require('walktree');
    console.log(walktree.arraySync())
    // list of all files recursively (root folder: './')
```

## Functions

```js
    // Synchronously fetch all files in string array format
    // if no parameter is provided the default values are used.
    walktree.arraySync()
        //  output: 
        //      ['anotherFolder', 'file1.txt', 'file2.txt', 'picture1.jpg']
        
    walktree.jsonSync(): Synchronously fetch all files in string array format
        //  output:
        //      [
        //        {
        //            parent: './',
        //            name: 'anotherFolder'
        //            stats: [fsObject stats],
        //            isFile: false,
        //            isDirectory: true
        //        },
        //      {
        //            parent: './',
        //            name: 'file1.txt'
        //            stats: [fsObject stats],
        //            isFile: true,
        //            isDirectory: false
        //        },
        //        {
        //            parent: './',
        //            name: 'file2.txt'
        //            stats: [fsObject stats],
        //            isFile: true,
        //            isDirectory: false
        //        },
        //        {
        //            parent: './',
        //            name: 'picture1.txt'
        //            stats: [fsObject stats],
        //            isFile: true,
        //            isDirectory: false
        //        }
        //    ]
```

## Options

```js
  walktree.arraySync([
    {
        ['root': root], // String = './'
        ['junk': junk], // Boolean = false
        ['junkRegExp': junkRegExp], // RegExp = RegExp in "junk" dependency module 
        ['type': type], // String = 'filesAndFolders'
        ['recursively': recursively], // Boolean = true
        ['extended': extended], // Boolean = true
        ['filter': filter],  // Stribg = '*'
    }
  ])
```
####The json option is not required, in those cases "walkdir" will use the default configuration.

1. `root` Is the root folder to start the walk. 

    ```js
        type: String
        default value: './'
        issue: in this version root can only point to current script execution directory './'
               or one of his childrens (for example './node_modules',  './views/templates',
               './scripts/bundle', etc.).
        example: 
            walktree = required('walktree')
            var w = walktree.arraySync({'root': './templates'})
            console.log(w)
            // Retrieve all files in "templates" folder (relative to the path of the 
            // caller script in your app) recursively as an array of string.
    ```
2. `junk` Should we fetch junk files too? (for example ".thumbnails", ".DS_Store", etc).

    ```js
        type: Boolean
        default value: false
        example: 
            walktree.arraySync({
                'root': './images', 
                junk: true 
            })
            // Retrieve all files inside "images" folder without getting thumbs.db (junk files) in the array.
    ```
3. `junkRegexp` regExp field to customize the junk filter

    ```js
        type: RegExp
        default value: /^npm-debug\.log$|^\..*\.swp$|^\.DS_Store|^\.AppleDouble$|^\.LSOverride$|^Icon[\r\?]?|^\._.*|^.Spotlight-V100$|\.Trashes|^__MACOSX$|~$|^Thumbs\.db$|^ehthumbs\.db$|^Desktop\.ini$/
        example: 
            walktree.arraySync({
                'root': './', 
                junkRegexp: /^.idea$|^.git$/
            })
    ```
4. `type` Modality of the walk, retrieve files and folders, only files or only folders

    ```js
        type: String
        default value: 'filesAndFolders'
        possible values: 'files' | 'folders' | 'filesAndFolders'
        example: 
            walktree.arraySync({
                'root': './', 
                'type': 'files'
            })
            // Retrieve only files
    ```
5. `recursively` boolean: default = true; should we look inside every folder too?

    ```js
        type: Boolean
        default value: true
        example: 
            walktree.arraySync({
                'recursively': false
            })
            // Retrieve only files in the folder specified but in the sub folders. In this
            // case because no folder is specified in the parameters, the folder that will 
            // be used is './'
    ```
6. `extended` Should we retrieve detailed properties of each file? (like isFile and isFolder)

    ```js
        type: Boolean
        default value: true
        example: 
            walktree.jsonSync({
                'extended': false
            })
            // Set it to false if you want to return the json structure with only "parent", 
            // "name" and "stat" fields.
    ```
7. `filter` RegExp | wildcard string default: '*'

```js
    var walktree = require('walktree');
    
    var w = walktree.jsonSync(
        {
            root: './templates'
          , filter: '*.html'
      //  , junk: true
        }
    );
    // will show only html files inside template folder. If you have more than one filter
    // you can use curly braces to separate them of example: 
    walktree.jsonSync(
        {
            root: './templates'
          , filter: '{*.html}{*.js}{*.css}'
        }
    );
    // This usage of filter will retrieve all html, javascript and cascade style files.
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
