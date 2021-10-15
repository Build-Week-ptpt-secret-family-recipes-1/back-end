const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    findBy,
    findById,
    addUser,
    removeUser
}

function getAll() {
    return db('users')
}

function findById(id) {
    return db('users').where({ userId: id}).first();
}

function findBy(filter) {
    return db('users').where({ filter }).first()
}

async function addUser(newUser) {
    const [id] = await db('users').insert(newUser)

    return findById(id)
}

async function removeUser(id) {

    const toBeRemoved = await findById(id)

    await db('users').where({ userId: id}).delete()

    return toBeRemoved
}