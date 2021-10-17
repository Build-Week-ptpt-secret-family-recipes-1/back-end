const db = require('../../data/dbConfig.js');
const { findRecipeById } = require('../recipes/recipe-model.js');

module.exports = {
    getAll,
    findBy,
    findById,
    addUser,
    removeUser,
    getUserRecipes,
    addUserRecipe,
    updateUserRecipe
}

function getAll() {
    return db('users')
}

function findById(id) {
    return db('users').where({ userId: id}).first();
}

function findBy(username) {
    return db('users').where({ username }).first();
}

async function addUser(newUser) {
    const [id] = await db('users').insert(newUser).returning('userId');

    return findById(id)
}

async function removeUser(id) {

    const toBeRemoved = await findById(id);

    await db('users').where({ userId: id}).delete();

    return toBeRemoved
}

function getUserRecipes(id) {
    return db('userRecipes as UR')
        .leftJoin('recipes as r', 'UR.recipeId', 'r.recipeId')
        .where('UR.userId', id)        
}

async function addUserRecipe(id, newRecipe) {
    let recipe_user_id = await db.transaction(async trx => {

        const [recipeId] = await trx('recipes as r').insert(newRecipe).returning('recipeId')

        const [uR_Id] = await trx('userRecipes as UR').insert({userId: id, recipeId: recipeId}).returning('userRecipeId')
        const dumb = await  trx('userRecipes as UR').where('userRecipeId', uR_Id).first()
        // console.log("userId", dumb)

        return dumb.userId
    }).catch(err => {
        console.log(err)
    })

    console.log(recipe_user_id)

    return getUserRecipes(recipe_user_id)
}

async function updateUserRecipe(updatedRecipe) {
    let { recipeId } = updatedRecipe

    const [updated] = await db('recipes').where("recipeId", recipeId).update(updatedRecipe).returning('recipeId')

    return findRecipeById(updated)

}