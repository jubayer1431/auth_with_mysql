const bcrypt = require('bcryptjs');
const { catchAsync } = require('../utils/catchAsync');
const { sendJWTToken } = require('../utils/jwtController');

const handleSignUp = catchAsync(async (req, res, db) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Check your form data. It's not Valid");
  }

  // making hash
  const hash = await bcrypt.hash(password, 12);

  // executing db query
  db.query(`INSERT INTO users set ?`, { name, email, password: hash }, (err, result) => {
    if (err)
      res.status(400).json({
        message: 'fail',
        data: err,
      });
    if (result) sendJWTToken(result, 200, res);
  });
});

module.exports = {
  handleSignUp,
};
