const BaseController = require('../baseController');
const Model = require('./models/user.model');
const {
  error,
  info
} = require('../../utils').logging;

// getting the model 
class userController extends BaseController {
  // constructor 
  constructor() {
    super();
    this.messageTypes = this.messageTypes.userAuthentication;
  }

  // do something 
  convertToNumber = async (req, res) => {
    try {
      info('running the controller');

      let roman = req.query.roman;
      let arr = roman.split('');

      // initialise the number 
      let number = 0;

      // iterating the number 
      for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
          case 'I':
            if (arr[i + 1] && (arr[i + 1] == 'V' || arr[i + 1] == 'X')) {
              if (arr[i + 1] == 'V') { number = number + 4; i = i + 1 }
              else { number = number + 9; i = i + 1 }
            } else number = number + 1;
            break;
          case 'V':
            number = number + 5;
            break;
          case 'X':
            number = number + 10;
            break;
        }
      }

      const resp = {
        status: 200,
        message: 'Its working',
        data: number
      };

      // success response 
      return this.success(req, res, this.status.HTTP_OK, resp, this.messageTypes.loggedInSuccess);

      // catch any runtime error 
    } catch (e) {
      error(e);
      this.errors(req, res, this.status.HTTP_INTERNAL_SERVER_ERROR, this.exceptions.internalServerErr(req, err));
    }
  }
}

// exporting the modules 
module.exports = new userController();
