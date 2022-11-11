const { response, request } = require('express');

const createUser = (req = request, resp = response) => {
  const { name, email, password } = req.body;

  resp.status(201).json({
    ok: true,
    msg: 'registro',
    user: {
      name,
      email,
      password,
    },
  });
};

const loginUser = (req = request, resp = response) => {
  const { email, password } = req.body;

  resp.json({
    ok: true,
    msg: 'login',
    user: {
      email,
      password,
    },
  });
};

const renewToken = (req = request, resp = response) => {
  resp.json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
