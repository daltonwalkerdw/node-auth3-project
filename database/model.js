const bcrypt = require("bcryptjs")
const db = require("../config")

async function add(user) {
    user.password = await bcrypt.hash(user.password, 10)

    const [id] = await db("users").insert(user)
    return findById(id)
}

function findBy(filter){
    return db("users")
    .select("id", "username", "password")
    .where(filter)
}

function findById(id) {
    return db("users")
        .select("id", "username", "password")
        .where({ id })
}

function find() {
    return db("users").select("id", "username")
}

module.exports = {
    add,
    findById,
    find,
    findBy
}