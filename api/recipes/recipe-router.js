const router = require('express').Router();
const Recipe = require('../recipes/recipe-model');
const mw = require('./middleware');

// Get all
router.get('/', async (req, res, next) => {
    try {
        const recipe = await Recipe.findAll()
        res.json(recipe)
    } catch (err) {
        next({ status: 500, message: 'Error getting recipes!', ...err })
    }
})

// Get by Id
router.get('/:id', async (req, res, next) => {
    try {
        const recipe = await Recipe(Recipe.findById(req.params.id))
        res.json(plant)
    } catch (err) {
        next({ status: 500, message: 'Error getting recipe!', ...err })
    }
})

// Add recipe

router.post('/', mw, async (req, res, next) => {
    try {
        const recipe = await Recipe.add(req.body)
        res.status(201).json(recipe)
    } catch (err) {
        next({ status: 500, message: 'Error creating recipe', ...err })
    }
})

// Update recipe

router.put('/:id', mw, async (req, res, next) => {
    try {
        const recipe = await Recipe.update(req.params.id, req.body)
        res.json(req.body)
    } catch (err) {
        next ({ status: 500, message: 'Error updating recipe', ...err })
    }
})

// Delete recipe
router.delete('/:id', async (req, res, next) => {
    try {
        const recipe = await Recipe.remove(req.params.id)
        res.json({ message: `Recipe removed with the Id of ${req.params.id}` })
    } catch (err) {
        next({ status: 500, message: 'Error deleting recipe', ...err })
    }
})

module.exports = router;