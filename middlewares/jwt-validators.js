const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validatorJWT = (req = request, resp = response, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return resp.status(401).json({
            ok: false,
            errors: 'not found token',
        });
    }

    try {
        const { id, name } = jwt.verify(token, process.env.SECRECT_JWT);

        req.id = id;
        req.name = name;
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            errors: 'token no valido',
        });
    }

    next();
};

module.exports = {
    validatorJWT,
};
