const express = require('express');
const router = express.Router();
const balanceDAO = require('./balanceDAO')

router.get('/:cpf', async function (req, res, next) {
    const cpf = req.params.cpf
    try {
        const userBalance = await balanceDAO.getUserBalanceByCpf(cpf)
        res.send(userBalance)
    } catch (error) {
        next(error)
    }
})



module.exports = router;