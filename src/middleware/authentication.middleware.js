const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const authorization = req.header('Authorization');

    if (!authorization) {
        res.status(401).json({
            message: 'No Auth token provided'
        });
        return;
    }

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const {
            params: {
                id: userId
            }
        } = req;

        // console.log('Token', token);
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (userId != verifiedToken.userId) {
            res.status(401).json({
                message: 'Invalid Token With User ID'
            })
            return;
        }
        next();
    } catch (err) {
        console.log('Error', err);
        next(err);
    }
};