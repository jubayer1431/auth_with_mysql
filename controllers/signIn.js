const bcrypt = require('bcryptjs');

const { catchAsync } = require('../utils/catchAsync');
const { sendJWTToken } = require('../utils/jwtController');

const handleSignIn = (db) =>
  catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Check your form data. It's not Valid");
    }

    db.query(`Select * from users where email = ? `, email, (err, result) => {
      if (err)
        res.status(404).json({
          message: 'fail',
          err,
        });
      if (result) {
        const isValid = bcrypt.compareSync(password, result[0].password);
        if (isValid) sendJWTToken(result[0], 200, res);
      }
    });
  });

module.exports = {
  handleSignIn,
};
