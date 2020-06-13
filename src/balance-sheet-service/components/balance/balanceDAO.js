const utils = require('../../utils')
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${process.env.DATABASE_HOST}`
const client = new MongoClient(url, { useNewUrlParser: true })


async function connectDatabase() {
    await client.connect();
    console.log("[DAO] Connected successfully to MongoDB");
    const db = client.db('admin')
    db.createCollection('users-balance-sheet')
}

async function createUserBalance({ cpf, nome, endereco, remuneracao }) {
    const collection = client.db('admin').collection('users-balance-sheet')
    const bens = randomExtractFromFile('../../mock/bens.json')
    const dividas = randomExtractFromFile('../../mock/dividas.json')
    const userBalance = {
        _id: cpf,
        nome,
        endereco,
        remuneracao,
        dividas,
        bens
    }
    const result = await collection.insertOne(userBalance)
    console.log('> User created')
}

async function getUserBalanceByCpf(cpf) {
    const collection = client.db('admin').collection('users-balance-sheet')
    const result = await collection.findOne({ _id: cpf })
    return result
}





function randomExtractFromFile(file) {
    let values = require(file)
    const quantityToExtract = utils.getRandomInt(1, 5)
    const result = utils.getRandomElements(values, quantityToExtract)
    return result;
}


connectDatabase()

module.exports = {
    connectDatabase,
    createUserBalance,
    getUserBalanceByCpf
}