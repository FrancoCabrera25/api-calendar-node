const { request, response } = require('express');
const { validationResult } = require('express-validator');

const fieldsValidators = (req = request, resp = response, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resp.status(400).json({
        ok: false,
        errors: errors.mapped(),
      });
    }

    next();
};

module.exports = {
    fieldsValidators,
}
