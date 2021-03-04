// user controller 
const ctrl = require('./user.controller');
// custom joi validation
const {
  joiRomanToNumber
} = require('./user.validators');

// exporting the user routes 
function userRoutes() {
  return (open, closed) => {
    open.route('/roman-to-number').get(
      [joiRomanToNumber], // joi validation
      ctrl.convertToNumber // controller function
    );
    // closed.route('/index').get(ctrl.doSomethingElse);
  };
}

module.exports = userRoutes();
