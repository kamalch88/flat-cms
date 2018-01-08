var path          = require('path')
var dirTree       = require('directory-tree')
var rootDir       = process.cwd()
var contentModule = require(path.join(rootDir, '/app/content'))

function init() {
    var tree = dirTree( path.join( rootDir, 'content' ), ['.md'] )
    
}

init()

exports.init = init