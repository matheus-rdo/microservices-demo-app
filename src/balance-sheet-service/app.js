
if (process.env.ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const { AppError } = require('./utils')
const amqpclient = require('./components/amqp-client')
const balanceDAO = require('./components/balance/balanceDAO')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        const response = { code: err.httpCode, message: err.description }
        return res.status(err.httpCode).send(response);
    }
    res.sendStatus(500);
}
app.use(errorHandler)

// Callback da fila de criação de usuários
amqpclient.start(msg => balanceDAO.createUserBalance(JSON.parse(msg.content)))

app.listen(3000, () => {
    console.log(`Server started and listening on port 3000`)
})