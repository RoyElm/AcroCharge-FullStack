require("../data-access-layer/dal");
const CustomerModel = require("../models/CustomerModel");
const transactionLogic = require("./transaction-logic");

//get all customers
function getAllCustomersAsync() {
    return CustomerModel.find().exec();
}

//Create a new customer
function saveCustomerAsync(customer) {
    return customer.save();
}

//get update specify customer by id
async function updateCustomerInfoAsync(customer) {
    const info = await CustomerModel.updateOne({ _id: customer._id }, customer).exec();
    return info.n ? customer : null;
}

//get customer by id
async function getCustomerByIdAsync(_id) {
    return CustomerModel.findById(_id).exec();
}


//delete customer by id
async function deleteCustomerById(_id) {
    await CustomerModel.deleteOne({ _id }).exec();
    return await transactionLogic.deleteAllTransactionsByCustomerId(_id);
}

module.exports = {
    saveCustomerAsync,
    getAllCustomersAsync,
    updateCustomerInfoAsync,
    getCustomerByIdAsync,
    deleteCustomerById
}