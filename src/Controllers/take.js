const express = require('express')
const authMiddlware = require('../midllewares/auth');

const router = express.Router();

router.use(authMiddlware);
router.get('/', (req, res) => {
    res.send({ ok: true });
});

module.exports = app => app.use('/projects', router)