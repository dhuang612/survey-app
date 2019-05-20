//process.env.NODE_ENV is auto generated from heroku
if (process.env.NODE_ENV === 'production') {
  //we created a simple if statement to help figure out which side to go.
  //we are in product return product keys
  module.exports = require('./prod');
} else {
  //we are in development return dev keys
  module.exports = require('./dev');
}
//we are moving the .gitignore from here /config/keys to config/dev
