// Used as a middleware to set a body field equal
// to a user id pulled from the jwt token
// e.g used to connect a current logged in user to a created resource
const setBodyFieldFromAuthUser = (fieldName = '') => (req, res, next) => {
  if (!req.body[fieldName]) req.body[fieldName] = req.user.id;
  next();
};

module.exports = setBodyFieldFromAuthUser;
