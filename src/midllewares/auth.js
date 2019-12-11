const jwt = require('jsonwebtoken')
const config = require("../config/auth.json");


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: "Sem token" });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ error: "Erro no Token" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Token esta incorreto!" });
    }

    jwt.verify(token, config, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token invalido' });

        req.userId = decoded.id;

        return next();
    })
}