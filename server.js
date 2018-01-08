const restify  = require('restify')
const cwd      = process.cwd()
const path     = require('path')
const app      = require(path.join(cwd, 'app'))

// https://www.npmjs.com/package/yamljs
const YAML = require('yamljs')
const config = YAML.load('./configs/core-config.yaml')

const server = restify.createServer({
    name: config.site_title,
    version: config.version
})

// configure static resource paths
server.get(/\/assets\/?.*/, restify.plugins.serveStatic({
    directory: __dirname + '/public',
    appendRequestPath: false,
    default: 'index.html'
}))

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
app.init()
server.listen(7000, () => console.log('%s listening at %s', server.name, server.url))
