const jwt = require('jsonwebtoken')
const customApiError = require('../errors/custom-error')



const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {throw new customApiError('No token provided', 401)}
    
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const luckyNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg: `Hello ${decoded.username}`, secret: `Your token is: ${luckyNumber}`})
    } catch (error) {
        throw new customApiError('Route not valid for you. Get back!', 401)
    }
    console.log(req.headers.authorization);
    next()
}

module.exports = authenticationMiddleware