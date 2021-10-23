const router = require('express').Router();
const Users = require('../users/usersModel');
const bcrypt = require('bcryptjs');
const mw = require('../recipes/middleware');
const {
    checkUsernameIsFree,
    checkUsernameExists,
    requirePassword
 } = require('./auth-middleware');
 const tokenBuilder = require('./tokenbuilder');


router.post('/register', mw, requirePassword, checkUsernameIsFree, async (req, res, next) => {
    const credentials = req.body
    try {
        const hash = bcrypt.hashSync(credentials.password, 8)
        credentials.password = hash
        let user = await Users.addUser(credentials)
        const token = tokenBuilder(user)
        res.status(201).json({ user, token })
    } catch (err) {
        next(err)
    }
})

router.post('/login', mw, requirePassword, checkUsernameExists, async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await Users.findBy( username )

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = tokenBuilder(user)
            res.status(200).json({
                user: {...user},
                token: token
            })
        } else {
            res.status(404).json({ message:  'Invalid login credentials' })
        }
    } catch (err) {
        next({ status: 500, message:  'Error logging in user', ...err })
    }
})

module.exports = router;
