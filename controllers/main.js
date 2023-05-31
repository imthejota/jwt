const jwt = require('jsonwebtoken')
const customApiError = require('../errors/custom-error')

const login = async (req, res) => {
    const {username, password} = req.body;
    // mongoose validation
    // Joi
    // controller
    if (!username || !password)  {throw new customApiError('Please provide mail and password', 400)}
    
    const id = new Date().getDate()
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})
    
    res.status(200).json({msg: 'User created', token})
}

const dashboard = async (req, res) => {
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
}

module.exports = {login, dashboard}