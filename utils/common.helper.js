const _ = require('underscore');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

exports.getBodyValues = async (body) => {
    const values = _.map(Object.keys(body), (key) => {
        return body[key];
    });
    return values;
};

exports.makeHash = value => {
    let hashedValue = crypto.createHash(process.env.HASH_ALGORITHM).update(value).digest("hex");
    return hashedValue;
};

exports.getToken = async (body, user) => {
    const { username } = body;
    let token = jwt.sign(
        {
            userId: user.id,
            username: username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP,
            jwtid: uuid(),
            algorithm: 'HS256',
            issuer: 'Babbel-backend'
        }
    );
    return token;
};