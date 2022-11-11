const jwt = require('jsonwebtoken');

const generateJWT = (id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { id, name };
        jwt.sign(
            payload,
            process.env.SECRECT_JWT,
            {
                expiresIn: '2h',
            },
            (error, token) => {
                if (error) {
                    reject('error al generar token');
                }
                resolve(token);
            }
        );
    });
};

module.exports = {
    generateJWT,
};
