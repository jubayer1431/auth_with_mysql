// Here All the middlewares have almost similar catch block and try catch block for error handling is a little messy. That's why we are implementing a async error handler. It will take away try catch block from all middlewares. Since middlewares accept functions not 'returned value of a function' / promise. that's why we return a function instead of promise and catch error on returning function.
const catchAsync = (func) => (req, res, next) => {
  // func(req, res, next).catch((err) => next(err));
  func(req, res, next).catch(next);
};

module.exports = { catchAsync };
