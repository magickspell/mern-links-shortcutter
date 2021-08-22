const jwt = require('jsonwebtoken')
const config = require('config')

//middleware to get auth data
module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }
    try {
        //"Bearer TOKEN" - we are parsing object and get 1st element from it - its token
        const token = req.headers.authorization.split(' ')[1]
        //we are checking if there is a token and decode it
        if (!token) {
            return res.status(401).json({message: "not authorized"})
        }
        //we are getting user (user id) from token cause we put user id there and decode it
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        // next - to continue request
        next()
    } catch (e) {
        res.status(401).json({message: "not authorized"})
    }
}