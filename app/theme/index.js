var fs         = require('fs')
var path       = require('path')
var Handlebars = require('handlebars')
var rootDir    = process.cwd()
var dirTree    = require('directory-tree')

exports.getThemeData = function getThemeData( themeName ) {
	
	var themeDirTree = dirTree(path.join( rootDir, 'themes', themeName ))
	var themeInfo    = parse(themeDirTree)
    
    var data         = {}
    data.layouts = processLayouts(themeInfo, themeName)
	return data

}

function parse(dirTree) {
    var data = {}
    
    if (typeof dirTree === 'object' && dirTree.hasOwnProperty('children')) {
        dirTree.children.forEach((dir) => {
            if (dir.name === 'layouts') {
                data.layouts = dir.children.map((layout) => {
                    return layout.name
                })
            } else if (dir.name === 'assets') {
                data.assets = dir
            }
    
        })
    }

    return data
}

function processLayouts(data, themeName) {
    var layouts = {}
    data.layouts.forEach((layout) => {
        layouts[ layout.replace('.hbs', '') ] = Handlebars.compile( fs.readFileSync( path.join(rootDir, 'themes', themeName + '/layouts/'+ layout), 'utf8' ))
    })

    return layouts
    
}