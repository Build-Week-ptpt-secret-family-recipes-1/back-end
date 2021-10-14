const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    findBy,
    findById,
    addUser
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