const {Router} = require('express')
const Link = require('../models/Link')
const config = require('config')
const shortid = require('shortid')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

//shortcut OF THE LINK! we are protected it with middleware authMiddleware
router.post('/generate', authMiddleware, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        // way from we are create url, we need redirect user there,  we get it from FRONTEND!
        const {from} = req.body
        // we are generating unique code
        const code = shortid.generate()
        // checking if there is one already
        const existing = await Link.findOne({from})
        if (existing) {
            return res.json({link: existing})
        }
        //creating short link (/t/ it is to)
        const to = baseUrl + '/t/' + code
        //new object of link creating with constructor
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()
        res.status(201).json({link})
    } catch (e) {
        res.status(500).json({message: "something went wrong with link, try again"})
    }
})
//getting all user-s links, here we are using middleware to get user data
router.get('/', authMiddleware, async (req,res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: "something went wrong, try again"})
    }
})
//getting all user-s link by id
router.get('/:id',authMiddleware, async (req,res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: "something went wrong, try again"})
    }
})

module.exports = router