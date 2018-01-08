'use strict'

var fs     = require( 'fs' )
var path   = require( 'path' )
var mkdirp = require('mkdirp')

exports.isFile = function (filepath) {

    try{
        return fs.statSync(filepath).isFile()
    }catch(e){
        return false
    }

};

exports.isDir = function (filepath) {
    try {
        return fs.statSync(filepath).isDirectory()

    } catch(e) {
        return false

    }
};

exports.deleteFolderRecursive = function(path) {
	if ( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				exports.deleteFolderRecursive(curPath);
			} else { // delete file
			fs.unlinkSync(curPath);
			}
		});

		fs.rmdirSync(path);
	}
};

/**
 * Creates a dir if it doesn't exist
 */
exports.makeDir = function(path) {
	var parentDir = path.substring(0, path.lastIndexOf('/'));

	if (!fs.existsSync( parentDir )) {
		return;
	}

	if (!fs.existsSync( path )) {
		// log('Creating output dir: '+ path);
		try {
			fs.mkdirSync( path );
		} catch( e ) {
			c.log(e);
		}
	    
	}
};

exports.walkDir = function (rootDir, callback) {
	
	var filenames, collection;

	if (exports.isDir( rootDir )) {
		filenames = fs.readdirSync( rootDir )
		collection = filenames.reduce(function(acc, name) {
			var abspath = path.join( rootDir, name );

			if (exports.isDir( abspath )) {
				acc.dirs.push( name );
			} else {
				acc.names.push( name );
			}

			return acc;


		}, {"names": [], "dirs": []}); //NO I18N

		// console.log('DIR: '+ rootDir);
		// console.log(collection);

		callback(rootDir, collection.dirs, collection.names);

		collection.dirs.forEach(function (dir) {
            var abspath = path.join(rootDir, dir);
            exports.walkDir(abspath, callback);
        });

	} else {
		exports.log("path: " + rootDir + " is not a directory"); //NO I18N
	}
};

exports.log = function() {
	var date = new Date();
	var logFn = global['con' + 'sole'].log; //NO I18N
	logFn( date );
	logFn.apply(null, arguments);
	logFn('');
	
	// fs.appendFile(logPath + '/log.txt', date, function(error) { 
	//    if (error) {
	//       logFn("write error:  " + error.message); 
	//    }
	//});

};


exports.createPath = mkdirp

