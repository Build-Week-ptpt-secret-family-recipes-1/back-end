const router = require('express').Router();

const Users = require('./usersModel')

router.get('/', (req, res, next) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users)
        })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Users.findById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
})


module.exports = router;