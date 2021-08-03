require("../data-access-layer/dal");
const TransactionModel = require("../models/TransactionModel");

//get all transactions
function getAllTransactionsAsync() {
    return TransactionModel.find().populate("customer").exec();
}

//Create a new transaction
function saveTransactionAsync(transaction) {
    return transaction.save();
}

//update specify transaction
async function updateTransactionAsync(transaction) {
    const info = await TransactionModel.updateOne({ _id: transaction._id }, transaction).exec();
    return info.n ? transaction : null;
}

//get transaction by id
async function getTransactionByIdAsync(_id) {
    return TransactionModel.findById(_id).populate('customer').exec();
}

//delete transaction by id
function deleteTransactionById(_id) {
    return TransactionModel.deleteOne({ _id }).exec();
}

//delete all transaction that relate to customer by customer id
function deleteAllTransactionsByCustomerId(customer_id) {
    return TransactionModel.deleteMany({ customer_id }).exec();
}

module.exports = {
    saveTransactionAsync,
    getAllTransactionsAsync,
    deleteTransactionById,
    deleteAllTransactionsByCustomerId,
    updateTransactionAsync,
    getTransactionByIdAsync
}