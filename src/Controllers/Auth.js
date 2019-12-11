const express = require('express');

const User = require('../model/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        const { email } = req.body

        if(await User.findOne({ email }))
            return res.status(400).send({ error: "Usuario já está cadastrado!" });
  
        const user = await User.create(req.body);

        return res.send({ user });
    } catch(err) {
        return res.status(500).send({ error: 'Deu ruim!' })
    }
})

module.exports = app => app.use('/auth', router);
