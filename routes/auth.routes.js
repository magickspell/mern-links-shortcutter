const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

//adding post
// /api/auth/register
router.post(
    '/register',
    [
      check('email', 'bad email').isEmail(),
      check('password', 'minimal password 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        console.log('Body:', req.body)
        // checking what user has been enter in form
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'wrong credentials for registration'
            })
        }
        // variable for users email and password
        const {email, password} = req.body
        // checking user existing
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: 'user already exist'})
        }
        // hashing password to avoid crack and creating user from model
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})
        //waiting user saving in mongodb adn return status
        await user.save()
        res.status(201).json({message: 'user created'})
    } catch (e) {
        res.status(500).json({message: "something went wrong, try again"})
    }
})
// /api/auth/login
router.post('/login',
    [
        check('email', 'insert good email').normalizeEmail().isEmail(),
        check('password', 'insert good password').exists()
    ],
    async (req, res) => {
        try {
            // checking what user has been enter in form
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'wrong credentials for login'
                })
            }
            // variable for users email and password
            const {email, password} = req.body
            // check if user exist
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'user dose not exist'})
            }
            // check if password match
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'passwords did not match, WRONG PASSWORD'})
            }
            // authorization ith jwt token
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.status(200).json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: "something went wrong, try again"})
        }
})

// exporting object of router from express, router is a middleware
module.exports = router