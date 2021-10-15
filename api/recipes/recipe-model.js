const db = require('../../data/dbConfig');

// Find all recipes
const findAll = () => {
    return db('recipes').orderBy('recipes.id')
}

// Find by category
const findBy = (type) => {
    return db('recipes').where({ type })
}
// Find recipe by ID
const findById = (id) => {
    return db('recipes').where({ id }).first()
}

// Add recipe to DB
const add = async (recipe) => {
    const [id] = await db('recipes').returning('id').insert(recipe)
    return findById(id)
}

// Remove recipe
const remove = (id) => {
    return db('recipes').where({ id }).del()
}

// Update recipe
const update = (id, changes) => {
    return db('recipes').where({ id }).update(changes)
}

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    remove,
    update
}