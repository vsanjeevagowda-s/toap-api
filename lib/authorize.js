const respStructure = require('../src/api/v1/apiResponse');

const checkAuthorization = (roles) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
   
    if (roles.length && !roles.includes(parseInt(req.currentUser.role))) {
      res.status(403).json(respStructure.responseStructure('AUTH_ERROR', { message: 'Forbidden' })); // user is forbidden
    } else {
      next(); // role is allowed, so continue on the next middleware
    }
  };
};

module.exports = checkAuthorization;
