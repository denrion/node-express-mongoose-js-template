const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const User = require('../models/User/user.model');

const isAuth = catchAsync(async (req, res, next) => {
  const token = getTokenFromAuthHeader(req) || getTokenFromCookie(req);

  if (!token)
    return next(
      new UnauthorizedError('Not authenticated. Please log in to get access')
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(
      new UnauthorizedError(
        'The user, to whom this token belongs, no longer exists.'
      )
    );

  // Check if user changed password after the token was issued
  if (currentUser.isPasswordChangedAfter(decoded.iat))
    return next(
      new UnauthorizedError(
        'The password was recently changed! Please log in again.'
      )
    );

  // place current user on the request object
  req.user = currentUser;

  // GRANT ACCESS TO THE PROTECTED ROUTE
  next();
});

const getTokenFromAuthHeader = (req) => {
  return req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : undefined;
};

const getTokenFromCookie = (req) => req.cookies.jwt;

module.exports = isAuth;
