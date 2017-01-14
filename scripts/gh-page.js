var ghpages = require('gh-pages');
var path = require('path');

//ghpages.publish(path.join(__dirname, '..'), function(err) {});
var test = path.join(__dirname, '..', 'example')
ghpages.publish(test,
  {

    repo: 'https://github.com/cannap/vue-siema'
  }, function () {

})
