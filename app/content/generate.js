const path    = require('path')
const dirTree = require('directory-tree')
const rootDir = process.cwd()
const YAML    = require('yamljs')
const config  = YAML.load( (path.join(rootDir, '/configs/core-config.yaml')) )
const theme   = require(path.join(rootDir, 'app/theme'))

exports.init = () => {
    
    var themeData = theme.getThemeData(config.theme_name)
    var tree = dirTree( path.join( rootDir, 'content' ), ['.md'] )

    
}