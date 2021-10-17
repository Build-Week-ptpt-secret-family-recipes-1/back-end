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

router.post('/', async (req, res, next) => {
    try {
        const newUser = await Users.addUser(req.body)
        res.status(201).json(newUser)
    }
    catch(err) {
        next(err)
    }
})

router.get('/:id/recipes', async (req, res, next) => {
    try {
        const userRecipeList = await Users.getUserRecipes(req.params.id)

        res.status(200).json(userRecipeList)

    }
    catch(err) {
        next(err)
    }
})

router.post('/:id/recipes', async (req, res, next) => {
    try {
        const user = req.params.id
        const recipe = req.body

        const addedRecipe = await Users.addUserRecipe(user, recipe)

        res.status(201).json(addedRecipe)
    } catch (err) {
        next(err)
    }
})

router.put('/:id/recipes', async (req, res, next) => {
    try {
        const user = req.params.id
        const recipe = req.body

        const updatedRecipe = await Users.updateUserRecipe(recipe)
        res.status(200).json(updatedRecipe)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await Users.removeUser(req.params.id)
        res.status(200).json(deletedUser)
    } catch(err) {
        next(err)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
    })
})

module.exports = router;