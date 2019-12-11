const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require("../config/auth.json");
const User = require('../model/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body

        if (await User.findOne({ email }))
            return res.status(400).send({ error: "Usuario já está cadastrado!" });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user });
    } catch (err) {
        return res.status(500).send({ error: 'Deu ruim!' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).send({ error: 'Usuario não encontrado!' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Senha incorreta' });
    }

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
    })

    return res.send({ user, token })
})

module.exports = app => app.use('/auth', router);
