const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SR1wKQYqlTLVWZSlYkot3xTu0qdZuWDn');
        req.auth = {
                userId: decodedToken.userId,
                isAdmin: decodedToken.isAdmin
        };

        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
