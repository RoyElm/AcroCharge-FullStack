const express = require("express");
const transactionLogic = require("../business-logic-layer/transaction-logic");
const errorsHelper = require("../helpers/errors-helper");
const transactionModel = require("../models/TransactionModel");
const router = express.Router();

//getting all transactions;
router.get("/", async (request, response) => {
    try {
        const allTransactions = await transactionLogic.getAllTransactionsAsync();
        response.json(allTransactions);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//getting specific transaction by id;
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const transaction = await transactionLogic.getTransactionByIdAsync(_id);
        response.json(transaction);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//delete transaction;
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await transactionLogic.deleteTransactionById(_id);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//create a new transaction;
router.post("/", async (request, response) => {
    try {
        const transaction = new transactionModel(request.body);
        const error = transaction.validateSync();
        if (error) return response.status(400).send(errorsHelper.getError(error));

        const addedTransaction = await transactionLogic.saveTransactionAsync(transaction);
        response.status(201).json(addedTransaction);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//update transaction 
router.put("/:_id", async (request, response) => {
    try {
        const transaction = new transactionModel(request.body);
        transaction._id = request.params._id;

        const updatedTransaction = await transactionLogic.updateTransactionAsync(transaction);
        if (!updatedTransaction)
            return response.status(404).send(`Transaction has not found please try again`);
        response.json(updatedTransaction);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


module.exports = router;