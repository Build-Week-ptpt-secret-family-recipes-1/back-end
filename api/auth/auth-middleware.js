const { jwtSecret } = require('../auth/secret');
const jwt = require('jsonwebtoken');
// const User = require('../users/usersModel');
const db = require('../../data/dbConfig');

const restricted = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]
        if (token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: 'You done it now!' })
                } else {
                    req.decodedToken = decodedToken
                    next()
                }
            })
        } else {
            throw new Error('Invalid data')
        }
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

async function checkUsernameIsFree(req, res, next) {
    try {
        const username = req.body.username
        const user = await db.select('username').from('users').where({ username })
        if (user.length >= 1) {
            res.status(422).json({ message: 'Username taken' })
        } else {
            next()
        }
    } catch (err) {
        next ({ status: 500, message: 'Error checking if username exists', ...err })
    }
}

async function checkUsernameExists(req, res, next) {
    try {
        const username = req.body.username
        const user = await db
            .select('username')
            .from('users')
            .where({ username })
        if (user.length === 0) {
            res.status(401).json({
                message: 'Username does not have an account'
            })
        } else {
            next()
        }   
    } catch (err) {
        next({
            status: 500,
            message: 'Error checking if username exists',
            ...err
        })
    }    
}

function requirePassword(req, res, next) {
    const { password } = req.body
    if (!password) {
        res.status(401).json({ message: 'Password is required' })
    } else {
        next()
    }
}

module.exports = {
    restricted,
    checkUsernameIsFree,
    checkUsernameExists,
    requirePassword
}