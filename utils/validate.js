const { validationResult } = require("express-validator");

function validate(req) {
  const result = validationResult(req);
  if (result.isEmpty()) return null;

  const errors = {};
  result.errors.forEach((err) => {
    errors[err.path] = err.msg;
  });
  return errors;
}

module.exports = validate;
