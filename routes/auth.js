const { Router } = require('express');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldsValidators } = require('../middlewares/fields-validators');
const { validatorJWT } = require('../middlewares/jwt-validators');
/*
rutas de usuarios
host + /api/auth
*/

//route

router.post(
  '/new',
  [
    //middlewares
    check('name', 'El nombre es oblgatorio').not().isEmpty(),
    check('email', 'El email es oblgatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({
      min: 6,
    }),
    fieldsValidators
  ],
  createUser
);

router.post('/login', [
    [
        //middlewares
        check('email', 'El email es oblgatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({
          min: 6,
        }),
        fieldsValidators
      ],
], loginUser);

router.get('/renew', validatorJWT, renewToken);

module.exports = router;
