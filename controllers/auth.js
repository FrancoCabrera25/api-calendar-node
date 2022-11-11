const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req = request, resp = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return resp.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            });
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        resp.status(201).json({
            ok: true,
            msg: 'Usuario creado correctamente',
            id: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'error al crear el usuario',
        });
    }
};

const loginUser = async (req = request, resp = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return resp.status(400).json({
                ok: false,
                msg: 'usuario y/o contraseña son incorrecto',
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'usuario y/o contraseña son incorrecto',
            });
        }

        const token = await generateJWT(user.id, user.name);

        resp.json({
            ok: true,
            msg: 'logueado correctamente',
            id: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'error buscar el usuario',
        });
    }
};

const renewToken = async (req = request, resp = response) => {
    const { id, name } = req;

    const token = await generateJWT(id, name);
    resp.json({
        ok: true,
        msg: 'renew',
        token,
    });
};

module.exports = {
    createUser,
    loginUser,
    renewToken,
};
