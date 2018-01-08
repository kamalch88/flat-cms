const path     = require('path')
const cwd  = process.cwd()
const generate = require(path.join(cwd, 'app/content/generate'))

exports.init = () => generate.init()
