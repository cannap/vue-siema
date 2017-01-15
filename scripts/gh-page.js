var ghpages = require('gh-pages')
var path = require('path')
var fs = require('fs-extra')

var exampleFolder = path.join(__dirname, '..', 'example/build.js')
var destFolder = path.join(__dirname, '..', 'gh-page')
fs.copySync(exampleFolder, path.join(destFolder, 'js', 'build.js'))

ghpages.publish(destFolder,
  {
    repo: 'https://github.com/cannap/vue-siema'
  }, function () {

  })
