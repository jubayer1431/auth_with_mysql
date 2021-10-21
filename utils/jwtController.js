const jwt = require('jsonwebtoken');
// Generate JWT Token or Sign JWT Token
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Sending JWT Token to the user
const sendJWTToken = (user, statusCode, response) => {
  const token = signToken(user.id);

  // sending cookie starts
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'prod') cookieOptions.secure = true;

  response.cookie('jwt', token, cookieOptions);
  // sending cookie ends

  // sending response
  response.status(statusCode).json({
    status: 'success',
    token,
    // data: {
    //     user,
    // },
  });
};

module.exports = { sendJWTToken };
