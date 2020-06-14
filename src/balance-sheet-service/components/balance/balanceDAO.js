const utils = require('../../utils')
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${process.env.DATABASE_HOST}`
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
const redis = require("redis").createClient({
    host: `${process.env.REDIS_HOST}`
})

async function createUserBalance({ cpf, nome, endereco, remuneracao }) {

    // Função para extrair os dados do mock
    function randomExtractFromFile(file) {
        let values = require(file)
        const result = utils.getRandomElements(values, utils.getRandomInt(1, 5))
        return result;
    }

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
    redis.set(`${cpf}-ultima-compra`, JSON.stringify(dividas[dividas.length - 1]))
    console.log('> User created')
    return result
}

async function getUserBalanceByCpf(cpf) {
    const collection = client.db('admin').collection('users-balance-sheet')
    const result = await collection.findOne({ _id: cpf })
    const cache = await recoverFromCache(cpf)
    redis.set(`${cpf}-ultima-consulta`, moment().format('lll'))
    return { ...result, ...cache }
}

async function recoverFromCache(cpf) {
    let ultimaConsulta = await getFromRedis(`${cpf}-ultima-consulta`)
    let ultimaCompra = await getFromRedis(`${cpf}-ultima-compra`)
    ultimaCompra = JSON.parse(ultimaCompra)
    return { ultimaConsulta, ultimaCompra }
}

// Wrap on promise
function getFromRedis(key) {
    return new Promise((resolve, reject) => {
        redis.get(key, (err, value) => {
            if (err) resolve(null)
            resolve(value)
        })
    });
}


async function initialize() {
    connectDatabase()
    configRedis()
    moment.locale('pt-br')
}


// Configurações das bibliotecas

async function connectDatabase() {
    await client.connect();
    console.log("[DAO] Connected successfully to MongoDB");
    const db = client.db('admin')
    db.createCollection('users-balance-sheet')
}

function configRedis() {
    redis.on('connect', function () {
        console.log('[REDIS] client connected');
    });

    redis.on('error', function (err) {
        console.log('[REDIS] error ' + err);
    });
}


module.exports = {
    initialize,
    connectDatabase,
    createUserBalance,
    getUserBalanceByCpf,
}